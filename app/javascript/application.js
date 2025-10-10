// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import { Turbo } from "@hotwired/turbo-rails"

// Turbo immediately (no 500ms delay)
Turbo.config.drive.progressBarDelay = 0

import "controllers"