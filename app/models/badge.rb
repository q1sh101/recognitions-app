class Badge < ApplicationRecord
  has_many :recognitions

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  # Returns Bootstrap color class based on badge type
  def color_class
    case name
    when "Team Player"
      "bg-success"   # Green — teamwork & collaboration
    when "Mentor"
      "bg-warning"   # Yellow/Orange — guidance & teaching
    when "Innovator"
      "bg-danger"    # Red — bold ideas & risk-taking
    when "Helper"
      "bg-info"      # Cyan — support & assistance
    else
      "bg-primary"   # Blue — default fallback
    end
  end
end
