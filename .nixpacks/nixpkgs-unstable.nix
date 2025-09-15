{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: {
    packages.${system} = nixpkgs.legacyPackages.${system}.node;
    devShells.${system} = with nixpkgs.legacyPackages.${system}; {
      default = mkShell {
        buildInputs = [
          nodejs-16_x
          yarn
          coreutils
          git
        ];
      };
    };
  };
}