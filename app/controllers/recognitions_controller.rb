class RecognitionsController < ApplicationController
  before_action :require_login

  def index
    # Base scope kept in a variable (stable with preload for pagination)
    scope = Recognition.preload(:badge, :sender, :recipient).order(created_at: :desc)

    # Pagy object (deterministic: count/page/limit computed explicitly)
    @pagy = Pagy.new(count: scope.count, page: params[:page], limit: 5)

    # Paginate recognitions (apply offset/limit explicitly for robustness)
    @recognitions = scope.offset(@pagy.offset).limit(@pagy.limit)

    @recognition = Recognition.new
    @badges = Badge.order(:name)
    @users = User.where.not(id: current_user.id).order(:name)
  end

  def create
    @recognition = Recognition.new(recognition_params)
    @recognition.sender = current_user

    # Validation (use strong params to avoid nil errors)
    rp = recognition_params
    if rp[:recipient_id].blank?
      flash.now[:recipient_error] = "Please select a recipient"
    end
    if rp[:badge_id].blank?
      flash.now[:badge_error] = "Please select a badge"
    end
    if rp[:message].blank?
      flash.now[:message_error] = "Message is required"
    end

    # Early return if validation errors
    if flash[:recipient_error] || flash[:badge_error] || flash[:message_error]
      load_data
      render :index, status: :unprocessable_entity
      return
    end

    # Save and redirect
    if @recognition.save
      redirect_to recognitions_path, notice: "Recognition sent successfully", status: :see_other
    else
      flash.now[:alert] = "Could not send recognition"
      load_data
      render :index, status: :unprocessable_entity
    end
  end

  private

  def recognition_params
    params.require(:recognition).permit(:recipient_id, :badge_id, :message)
  end

  def load_data
    # Same pagination when re-rendering (validation errors, etc.)
    scope = Recognition.preload(:badge, :sender, :recipient).order(created_at: :desc)
    @pagy = Pagy.new(count: scope.count, page: params[:page], limit: 5)
    @recognitions = scope.offset(@pagy.offset).limit(@pagy.limit)

    @recognition ||= Recognition.new
    @badges = Badge.order(:name)
    @users = User.where.not(id: current_user.id).order(:name)
  end
end
