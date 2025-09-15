{ system ? builtins.currentSystem, config ? { allowUnfree = true; } }:
{
  nixpkgs = import <nixpkgs> { inherit system config; };
}
