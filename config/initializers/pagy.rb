# frozen_string_literal: true

# ensure Pagy constant is loaded before extras
require "pagy"
# Use Bootstrap-styled pagination helpers (renders <ul class="pagination">)
require "pagy/extras/bootstrap"

# Safe behavior for out-of-range ?page= values (e.g. page too large)
require "pagy/extras/overflow"

# Default items per page for message lists (adjust if needed)
Pagy::DEFAULT[:limit] = 5

# When requested page is too large, fall back to the last page (better UX)
Pagy::DEFAULT[:overflow] = :last_page
