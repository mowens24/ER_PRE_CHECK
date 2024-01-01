{ pkgs }: {
  deps = [
    pkgs.vimPlugins.coc-haxe
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}