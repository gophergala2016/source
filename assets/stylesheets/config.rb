# ************************************
# HTTP Path
# ************************************
http_path = "/"

# ************************************
# CSS Directory
# ************************************
css_dir = "/"

# ************************************
# Sass Directory
# ************************************
sass_dir = "scss"

# ************************************
# Image Directory
# ************************************
images_dir = "images/"

# ************************************
# JavaScript Directory
# ************************************
javascripts_dir = "js/"

# ************************************
# Other
# ************************************
# .sass-cache output
cache = false

# asset_cache_buster
asset_cache_buster :none

# sass_options
sass_options = { :debug_info => false }

# output_style
output_style = :expanded

# relative_assets
relative_assets = true

# line_comments
line_comments = false

# ************************************
# Sprites
# ************************************
# Make a copy of sprites with a name that has no uniqueness of the hash.
#on_sprite_saved do |filename|
#  if File.exists?(filename)
#    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#    FileUtils.rm_rf(filename)
#  end
#end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
#on_stylesheet_saved do |filename|
#  if File.exists?(filename)
#    css = File.read filename
#    File.open(filename, 'w+') do |f|
#      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
#    end
#  end
#end

on_stylesheet_saved do |filename|

 	next if !File.exists?(filename)
 	next if filename.include? 'assets'

	file = File::basename(filename)

	# PC
	if filename.include? 'pc'
		dest_path = '../../public/css/pc'
	# SP
	elsif filename.include? 'sp'
		dest_path = '../../public/css/sp'
	end

	source = open(filename)
	dest = open(dest_path << file, "w")
	dest.write source.read

	p 'COPY: ' << dest_path
	dest.close
	source.close

end
