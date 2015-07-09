

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




## Meta

**License**

The awesome list is dedicated to the public domain. Use it as you please with no restrictions whatsoever.

**Questions? Comments?**

Send them along to the ruby-talk mailing list. Thanks!
