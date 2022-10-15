# amazon linux 2

# yum update
sudo yum update -y

# yum upgrade 
sudo yum upgrade -y

# git 설치
sudo yum install -y git

# # golang 설치 (deno 로 대체)
# pushd /usr/local
# sudo wget https://go.dev/dl/go1.19.2.linux-amd64.tar.gz
# tar -C /usr/local -xzf go1.19.2.linux-amd64.tar.gz
# popd
# # bash_profile 내용 변경
# read -r -d '' exportContent <<EOI
# export GOPATH=\$HOME/go\n\
# export PATH=\$PATH:\$GOPATH/bin\n\
# export PATH=\$PATH:/usr/local/go/bin
# EOI
# sed -i'' -r -e "/User specific environment and startup programs/a\\$exportContent" ~/.bash_profile
# source ~/.bash_profile

# nodejs 설치
sudo curl -sL https://rpm.nodesource.com/setup_16.x | bash -
sudo yum -y install nodejs

# deno 설치 (폴더명 변경 및 삭제 처리에 deno 사용)
sudo -u ec2-user curl -fsSL https://deno.land/install.sh | sudo -u ec2-user sh
read -r -d '' exportContent <<EOI
export DENO_INSTALL="/home/ec2-user/.deno"\n\
export PATH="\$DENO_INSTALL/bin:\$PATH"
EOI
sed -i'' -r -e "/User specific environment and startup programs/a\\$exportContent" ~/.bash_profile
sed -i'' -r -e "/User specific environment and startup programs/a\\$exportContent" /home/ec2-user/.bash_profile
# 이후에는 ec2-user 계정인 상태에서 "source ~/.bash_profile" 명령어 진행
