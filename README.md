<div align=center>

<h1>Day</h1>

<h3>다양한 콘텐츠를 할일로 등록하고 진행상황을 한눈에
 확인하세요!
</h3>

<br/>

![alt text](image.png)

**[Day 바로가기](https://daaay.vercel.app)**

</div>
<br/>

## 🖼️ 프로젝트 소개

#### 유저가 다양한 콘텐츠(아티클, 강의 영상, 줌 미팅 일정, 강의 PDF 등)를 할일 목록으로 관리하고, 학습 진도나 프로젝트 진행 상황을 대시보드로 보여주며 각 할일에 대한 노트를 작성해 관리하는 서비스입니다.

<br>

## 👥 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/seongseonko">팀장 FE_고성선</a>
      </td>
      <td align="center">
        <a href="https://github.com/chlangus">FE_최무현</a>
      </td>
      <td align="center">
        <a href="">DE_이은송</a>
      </td>
    </tr>

  </tbody>
</table>

<br/>

## 🛠️ 기술 스택 및 협업

### 개발

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
<img src="https://img.shields.io/badge/Zustand-F36D00?style=for-the-badge&logo=&logoColor=white">
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
<img src="https://img.shields.io/badge/NEXTUI-000000?style=for-the-badge&logo=NEXTUI&logoColor=white">
<img src="https://img.shields.io/badge/NextAuth-ffff00?style=for-the-badge" />
<img src="https://img.shields.io/badge/reactquill-0000f?style=for-the-badge" />

### 테스트

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

### 프로젝트 일정

![image](https://github.com/user-attachments/assets/2e5e70d0-d1e7-42c9-81f9-a443cb7c24e8)

> Github Project와 Issue를 연결하여 주차별로 일정을 관리하였습니다.

### 협업 툴

![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

> webhook을 통해 discord와 연결하여 PR, issue 등 프로젝트 변동 사항에 대해 빠르게 피드백 할 수 있었습니다.

<br/>

## 📝 프로젝트 컨벤션

#### 상수 : CAPITAL_SNAKE_CASE

#### 변수 / 함수 : camelCase

#### 컴포넌트 / 인터페이스 : PascalCase

#### 콜백 제외한 컴포넌트 및 함수는 선언형으로 통일

#### 간단한 함수는 화살표함수로 작성

#### export default 는 컴포넌트 에 적용 일반 함수 등은 export 사용

### 예시 )

```jsx
`상수`

const MY_NAME = 'thomas';

`변수, 함수`

const roomNumber = 3;

function getYourData() {
	console.log("hello world");
}

`클래스, 컴포넌트, 인터페이스 예시`

class Person{}

export default function Person () {}

interface Person {}

`함수 예시`
function calculate () {}
function Home () {}

`화살표 함수 예시`
<button onClick=(()=> setState(!state))>상태 변경</button>
```

### 디렉터리 구조

#### 도메인별로 대괄호(’()’)로 묶어서 생성

#### 일회성 타입은 그 컴포넌트 상단에 작성

#### 여러차례 사용되는 타입은 types에 작성 ex) fetch data

### 예시 )

```jsx
├── utils // 공통 함수
│   └── calculateTime.ts
├── types // 공통 타입
│   └── User.ts
│   └── TodoItem.ts
├── constants // 공통 상수
|   └── buttonNameList.ts
├── components // 공용 컴포넌트
│   └── Button  // Button 컴포넌트 관련 요소들
│       └── Button.tsx // 컴포넌트
├── api
│   └── axios.ts // axios 설정
│   └── mypage // 도메인별 api 설정
│       └── updateUserProfile.ts // 요청별 api 파일
├── stores // zustand 전역상태 폴더
│   └── useUserStore.ts
├── app
│   └── (home) // home 도메인
│       └── layout.tsx // 공통 레이아웃
│       └── page.tsx   // '/'
│   └── (mypage) // mypage 도메인
│       └── mypage //
│           └── _components // mypage 컴포넌트
│           └── _utils // mypage 함수
│           └── _types // mypage 타입
│           └── _constants // mypage 상수
│           └── layout.tsx // mypage 레이아웃
│           └── page.tsx // '/mypage'
├── tailwind.config.ts // 애니메이션 및 여러군데 공통으로 사용되는 스타일 정의
├── assets
│   └── images
│   └── svgs
└── styles
    └── global.css
```

### 커밋 메시지

| Type 키워드 | 사용 시점                                                             |
| ----------- | --------------------------------------------------------------------- |
| feat        | 새로운 기능 추가                                                      |
| fix         | 버그 수정                                                             |
| docs        | 문서 수정                                                             |
| style       | 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)기능 수정이 없는 경우 |
| design      | 사용자 UI 디자인 변경 (CSS 등)                                        |
| test        | 테스트 코드, 리팩토링 테스트 코드 추가                                |
| refactor    | 코드 리팩토링                                                         |
| build       | 빌드 파일 수정                                                        |
| ci          | CI 설정 파일 수정                                                     |
| perf        | 성능 개선                                                             |
| chore       | 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등)                |
| rename      | 파일 혹은 폴더명을 수정만 한 경우                                     |
| remove      | 파일을 삭제만 한 경우                                                 |

#### PR 리뷰 남기고 본인이 리뷰 확인하여 적용 한 뒤 merge

  <br/>

## 트러블 슈팅

<ul>
  <li>
  <a href='https://calm-starfish-862.notion.site/nprogress-bar-84a05edfe96d491b8a20d01987a72ea7?pvs=4'>
  Nprogess-bar 관련 이슈 보기
  </a>
  </li>
  <li>
    <a href='https://calm-starfish-862.notion.site/React-quill-d4d3ba4dfbb14ad08ff28c99567844c3?pvs=4'>
    React-Quill 관련 이슈 보기
    </a>
  </li>
</ul>
