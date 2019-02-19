
New to (Secure) Ruby? See the [Red Paper](https://github.com/s6ruby/redpaper)!


# (Secure) Ruby to Solidity (Source-to-Source) Cross-Compiler Cheat Sheet / White Paper


## By Example


**Hello, World! - Greeter**

``` ruby
############################
# Greeter Contract 


# @sig (string) public
def setup( greeting )
  @owner    = msg.sender
  @greeting = greeting
end

# @sig () public view returns (string)
def greet
  @greeting
end

# @sig () public
def kill
  if msg.sender == @owner
    selfdestruct( msg.sender )
  end
end
```

gets cross-compiled to:

``` solidity
contract Greeter {
    address owner;
    string  greeting;

    constructor( string _greeting ) public {
        owner    = msg.sender;
        greeting = _greeting;
    }

    function greet() public view returns (string) {
        return greeting;
    }

    function kill() public { 
      if(msg.sender == owner) selfdestruct(msg.sender); 
    }
}
```


**Mint Your Own Money - Minimal Viable Token**

``` ruby
############################
# My Token Contract

# @sig (uint256) public
def setup( initial_supply )
  @balance_of = Mapping.of( Address => Money )
  @balance_of[ msg.sender] = initial_supply
end

# @sig (address, uint256) public returns (bool)
def transfer( to, value )
  assert @balance_of[ msg.sender ] >= value
  assert @balance_of[ to ] + value >= @balance_of[ to ]

  @balance_of[ msg.sender ] -= value
  @balance_of[ to ]         += value

  true
end
```

gets cross-compiled to:

``` solidity
contract MyToken {
    mapping (address => uint256) public balanceOf;

    constructor( uint256 _initialSupply ) public {
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to]        += _value;
        
        return true;
    }
}
```

Note: For now there's no magic type inference for function signatures -
you MUST annotate all ruby function.
Example:

``` ruby
# @sig (uint256) public
def setup( initial_supply ) 
  # ...
end
```

becomes

``` solidity
constructor( uint256 _initialSupply ) public {
  // ...
}
```

and

``` ruby
# @sig (address, uint256) public returns (bool)
def transfer( to, value )
  # ...
end
```

becomes

``` solidity
function transfer(address _to, uint256 _value) public returns (bool) {
  // ...
}
```

and so on and so forth.





## License

![](https://publicdomainworks.github.io/buttons/zero88x31.png)

The (secure) ruby cross-compiler scripts are dedicated to the public domain.
Use it as you please with no restrictions whatsoever.


## Request for Comments (RFC)

Send your questions and comments to the ruby-talk mailing list. Thanks!

