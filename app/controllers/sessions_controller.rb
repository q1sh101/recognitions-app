class SessionsController < ApplicationController
  def new
    redirect_to root_path if logged_in?
  end

  def create
    # Validate empty fields
    if params[:email].blank?
      flash.now[:email_error] = "Email is required"
    end

    if params[:password].blank?
      flash.now[:password_error] = "Password is required"
    end

    # Validate email format
    if params[:email].present? && !params[:email].match?(/\A[^@\s]+@[^@\s]+\.[^@\s]+\z/)
      flash.now[:email_error] = "Please enter a valid email address"
    end

    # Early return if validation errors exist
    if flash[:email_error] || flash[:password_error]
      render :new, status: :unprocessable_entity
      return
    end

    # Authentication attempt
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logged in", status: :see_other
    else
      flash.now[:alert] = "Invalid email or password"
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to login_path, notice: "Logged out", status: :see_other
  end
end