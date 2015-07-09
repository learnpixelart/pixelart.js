

# Rack

A collection of awesome Rack goodies, libraries, tools, extensions, guides, etc.

#### _Contributions welcome. Anything missing? Send in a pull request. Thanks._


## Rack HQ

_A Ruby Webserver Interface - mix-n-match web servers and web apps; stack web apps inside web apps inside web apps_

(web: [rack.github.io](http://rack.github.io), github: [rack/rack](https://github.com/rack/rack), gem: [rack](https://rubygems.org/gems/rack))


Simple App Examples:

~~~
class HelloWorld
  def call(env)
    [200, {"Content-Type" => "text/plain"}, ["Hello, world!"]]
  end
end
~~~

or

~~~
Proc.new { |env| [200, {"Content-Type" => "text/plain"}, ["Hello, world!"]] }
~~~

or

~~~
->(env) { [200, {"Content-Type" => "text/plain"}, ["Hello, world!"]] }
~~~




## Middleware

Example:

~~~
class ResponseTimer
  def initialize(app)
    @app = app
  end
  
  def call(env)
    start = Time.now
    status, headers, response = @app.call(env)
    stop = Time.now
    if headers["Content-Type"].include? "text/html"
      [status, headers, "<!-- Response Time: #{stop - start} -->\n" + response.body]
    else
      [status, headers, response]
    end
  end
end
~~~


**Rack::ShowExceptions**

Catches all thrown exceptions and wraps them nicely in an helpful 500-page.

**Rack::CommonLogger**

Does Apache-style logs.

**Rack::URLMap**

Redirects to different Rack applications depending on the path and host (a very simple router).


**Rack::Sendfile**  _rails_

Sets server specific X-Sendfile header.

**Rack::Lock** _rails_

Sets env["rack.multithread"] flag to false and wraps the application within a Mutex.

**Rack::Runtime** _rails_

Sets an X-Runtime header, containing the time (in seconds) taken to execute the request.

**Rack::MethodOverride**  _rails_

Allows the method to be overridden if params[:_method] is set. 
This is the middleware which supports the PUT and DELETE HTTP method types.

**Rack::Head** _rails_

Converts HEAD requests to GET requests and serves them as so.

**Rack::ConditionalGet**  _rails_

Adds support for "Conditional GET" so that server responds with nothing if page wasn't changed.

**Rack::ETag**  _rails_

Adds ETag header on all String bodies. ETags are used to validate cache.



### Rails on Rack

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

- **the_metal** (github: [tenderlove/the_metal](https://github.com/tenderlove/the_metal)) - a spike for thoughts about Rack 2.0 by Aaron Patterson



## Meta

**License**

The awesome list is dedicated to the public domain. Use it as you please with no restrictions whatsoever.

**Questions? Comments?**

Send them along to the ruby-talk mailing list. Thanks!
