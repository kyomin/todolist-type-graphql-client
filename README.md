# todolist-type-graphql-client   
## make todo list using React and TypeScript and Apollo Client      

서버 프로젝트의 디렉토리 구조는 다음과 같습니다.      

`/src/actions`                    => 리덕스의 액션(action) 정의     
`/src/components`                 => 페이지 뷰를 위한 컴포넌트 정의   
`/src/hoc`                        => 특정 컴포넌트에 기능을 부여하기 위한 High Order Component 정의.   
즉, 특정 컴포넌트에 자격을 부여하여 사용자가 페이지 이용 권한이 있는지 체크한다.   
`/src/mutations`                  => 아폴로 서버로 GraphQL 뮤테이션 요청을 보내기 위한 request 정의   
`/src/queries`                    => 아폴로 서버로 GraphQL 쿼리 요청을 보내기 위한 request 정의   
`/src/reducers`                   => 리덕스의 리듀서(reducer) 정의   
`/src/types`                      => enum, interface와 같은 타입스크립트 환경에서 사용하기 위한 타입들 정의          
  
`/src/App.tsx`  => 모든 컴포넌트의 라우팅을 정의한 루트 라우터
