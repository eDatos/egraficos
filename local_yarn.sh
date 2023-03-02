if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 1
fi
export PATH=node:$PATH && node/yarn/dist/bin/yarn $1