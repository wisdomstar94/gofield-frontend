# Gofield Frontend (스포츠 이커머스)

### 프레임워크
- Next.js (https://nextjs.org/)

### 상태관리
- Recoil (https://recoiljs.org/ko/

### CI/CD
- Github Action
- Aws Cli (github action 컨테이너의 public ip가 배포 서버의 ssh 포트에 접근 할 수 있게 하기 위함입니다.)
- Deno (폴더명 변경 및 삭제 등의 작업시 deno 를 사용하였습니다.)

### 레포지토리
- 서명된 커밋(Signed Commit) 적용

<br />
<br />

# 자체 인터뷰
### Q1. 왜 이 사이드 프로젝트를 하게 되었나요?
고필드는 스포츠를 전문으로 하는 쇼핑몰 플랫폼입니다. 쇼핑몰 플랫폼의 개발은 저로써는 처음이었기 때문에, 만약 이 사이드 프로젝트를 하게 된다면 쇼핑몰을 개발하면서 겪을 수 있는 이슈들을 미리 겪어볼 수 있겠다 라는 생각이 들어서 이 사이드 프로젝트를 시작하게 되었습니다.

<br />

### Q2. 이 사이드 프로젝트에서 맡으신 분야가 어떤건가요?
저는 프론트엔드 개발자로 이 사이드 프로젝트에 합류했습니다. :)

<br />

### Q3. 왜 프론트엔드 프레임워크로 Next.js 를 선택하셨나요?
사실 저에게 익숙한 프론트엔드 프레임워크는 Angular 입니다. 그리고 최근까지 실무에서 작업해본 것도 Angular 였습니다. 하지만 프론트에서 가장 많이 사용되는 라이브러리는 React 였고, 그 React 의 프레임워크인 Next.js 가 많이 사용되고 있다는 것을 알았습니다. 그래서 어떤 점 때문에 그렇게 많이 사용하는지 직접 경험해보고자 Next.js 를 선택하게 되었습니다. 

<br />

### Q4. 왜 상태관리 라이브러리로 Recoil 을 선택하셨나요?
React 에서 많이 사용되는 상태관리 라이브러리로 Redux와 Recoil이 있다는 걸 알게되었습니다. Redux 는 현재 가장 많이 사용되고 있는 상태관리 라이브러리이지만 상태관리시 필요한 파일을 많이 생성해야하고 React 의 훅 라이프사이클과는 별개로 작동한다는 점이 있었습니다. 하지만 Recoil 은 상태관리시 필요한 파일이 매우 적었으며 React 의 훅 함수를 사용하듯이 상태관리를 할 수 있었습니다. 그래서 저는 개인적으로 더 장점이 많이 느껴진 Recoil 을 선택하게 되었습니다.

<br />

### Q5. 왜 CI/CD 로 Github action 을 선택하셨나요?
최근까지 회사에서 사용한 CI/CD 툴이 Github action 이기도 했고, 저장소를 github 를 쓰고 있기 때문에 github 한 곳에서 레포지토리와 CI/CD 를 모두 관리하고자 Github action 을 선택하게 되었습니다.

<br />

### Q6. 서버 구성은 어떻게 되어 있나요?
사이드 프로젝트이고 아직 초기 개발 단계이기 때문에 백엔드 개발자분께서 AWS 에 ec2 인스턴스를 가장 낮은 사양으로 1개 생성해주셨고, 현재 이 1개 인스턴스에 백엔드와 프론트엔드가 모두 돌아가고 있는 상태입니다. 부하가 심할 경우에는 프론트 서버를 따로 분리할 예정입니다. 또한 서비스가 실제로 런칭이 되어야 할 때는 서버 구성에 대해 재 논의가 필요할 것으로 보입니다.

<br />

### Q7. 협업은 어떻게 진행되고 있나요?
Slack 으로 의사소통을 진행하고 있으며 Google Meet 으로 정기적인 온라인 회의를 통해 진행상황 체크 및 논의 등을 진행합니다. 그리고 문서 정리같은 경우는 Notion을 사용하고 있고, 디자인 관련 부분은 Zeplin을 통해 협업을 하고 있습니다.

