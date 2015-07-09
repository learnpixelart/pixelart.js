

# Rack

A collection of awesome Rack goodies, libraries, tools, extensions, guides, etc.

#### _Contributions welcome. Anything missing? Send in a pull request. Thanks._


## Rack HQ

_A Ruby Webserver Interface - mix-n-match web servers and web apps; stack web apps inside web apps inside web apps_

(web: [rack.github.io](http://rack.github.io), github: [rack/rack](https://github.com/rack/rack), gem: [rack](https://rubygems.org/gems/rack))


Simple App Examples:

~~~
Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['A barebones rack app.']] }
~~~

or

~~~
->(env) { ['200', {'Content-Type' => 'text/html'}, ['A barebones rack app.']] }
~~~



## Middleware

**Rack::Sendfile**

**Rack::Lock**

**Rack::Runtime**

**Rack::MethodOverride**

**Rack::Head**

**Rack::ConditionalGet**

**Rack::ETag**




### Rails and Rack

- [Rails on Rack Guide](http://guides.rubyonrails.org/rails_on_rack.html)

Use

~~~
$ bin/rake middleware
~~~

to show the middleware stack in use. Resulting in:

~~~
use Rack::Sendfile
use ActionDispatch::Static
use Rack::Lock
use #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x000000029a0838>
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::RemoteIp
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActiveRecord::Migration::CheckPending
use ActiveRecord::ConnectionAdapters::ConnectionManagement
use ActiveRecord::QueryCache
use ActionDispatch::Cookies
use ActionDispatch::Session::CookieStore
use ActionDispatch::Flash
use ActionDispatch::ParamsParser
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
run Rails.application.routes
~~~




## Alternatives

- the_metal (github: [tenderlove/the_metal](https://github.com/tenderlove/the_metal)) - a spike for thoughts about Rack 2.0 by Aaron Patterson



## Meta

**License**

The awesome list is dedicated to the public domain. Use it as you please with no restrictions whatsoever.

**Questions? Comments?**

Send them along to the ruby-talk mailing list. Thanks!
