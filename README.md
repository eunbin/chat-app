# chat-app

>  socket.io 를 활용한 채팅 어플리케이션



## 설치 및 실행

```
cd chat-front
npm install
npm run build
cd ..
cd chat-server
npm install
npm run start
```

### 테스트 실행

```
npm run test:unit
```

### 

### 개발 환경

##### Back-end

- Node.js

- Socket.io

##### Front-end

- Vue.js

- socket-io-client

- Vuetify

- vue-chat-scroll



### Features

- 사용자는 첫 진입 시, ID를 입력하여 접속할 수 있다.
  - 아이디 입력 Validation 없음
  - 서버의 ActiveUserList와 비교하여 아이디 중복체크
  - login 이벤트 emit 후 성공 Callback으로 UserInfo(아이디, 소켓아이디)를 Vuex Store에 저장한다.
  - 인증이 필요한 페이지로 이동시마다 UserInfo State 를 확인하여 인증 처리
  - 화면 Refresh 되어 정보가 유실된 경우 로그인 페이지로 Redirect
- 채팅방 리스트에서 채팅방을 선택하여 들어갈 수 있다.
  - 로그인 성공 시 반환된 RoomList 를 리스트에 바인딩
  - 리스트 아이템 선택 시 /chat-room/:id 로 라우팅하여 채팅방 입장
  - 화면 상단 Toolbar 좌측 버튼을 클릭하여 로그아웃 할 수 있다.
  - 채팅방 입장 시 join 이벤트 emit, roomId를 socekt room으로 사용한다.
  - 채팅방 퇴장 시 leave 이벤트 emit
  - 입장/퇴장 안내 메시지가 자동으로 메시지 스레드에 추가된다
- 채팅방에 다른 사용자를 초대할 수 있다.
  - 로비에서 대기중인 사용자 목록이 리스트에 조회된다.
  - 다른 채팅방에서 대화중인 사용자와 나는 목록에서 제외해야 함
  - 초대받은 사용자는 동의/무시 를 선택할 수 있다.
- 사용자는 채팅방에서 텍스트를 입력할 수 있다.
  - 텍스트필드에서 메시지를 입력하고, 엔터를 클릭하여 메시지를 전송한다.
  - 전송 후, 텍스트필드는 초기화된다.
  - 내가 보낸 메시지와 다른 사용자로 부터 수신된 메시지는 좌/우측, 서로 다른 색상 으로 구분한다.
  - 메시지 전송자 아이디와 시간이 표시된다.
- 사용자는 채팅방에서 이미지를 입력할 수 있다.
  - 이미지 아이콘버튼을 클릭하면 파일 Dialog 가 팝업된다.
  - 이미지 타입의 파일만 선택할 수 있으며, Single Selection만 허용한다.
  - base64로 인코딩한 String과 파일명을 서버로 전송하고, 서버에서는 이를 바로 Broadcast 한다.

 

### 문제해결전략

#### 서버구현

- socket.io 활용하여 필요한 모든 기능 구현

- 채팅방 모델
  ```
  {
    title: String,
    roomId: Number,
    members: Array,
  }  
  ```
- 사용자 모델
  ```
  {
    userId: String,
    socketId: String,
  }
  ```
  
- socket.io 의 room 기능을 사용하여 채팅방 분리

- namespace 기능은 활용 보류

- 그룹 전체에 메시지 전송할 때 - join/leave

  ```
  io.to(방의 아이디).emit('이벤트명', 데이터);
  ```

- 나를 제외한 그룹 전체에 메시지 전송 - chat/image

  ```
  socket.broadcast.to(방의 아이디).emit('이벤트명', 데이터);
  ```

- 특정 사용자에게만 메시지 전송 - invite

  ```
  io.to(userInfo.socketId).emit('이벤트명', 데이터);
  ```

- Callback - 로그인/로그아웃/초대가능한 사용자 조회 시 

  ```
  io.on('connection', function (socket) {
    socket.on('ferret', function (name, word, fn) {
      fn(name + ' says ' + word);
    });
  });
  ```


#### UI 구현

- 화면
  - Login.vue - 최초 로그인 화면
  - ChatLobby.vue - 로그인 후 채팅방 목록 조회
  - ChatRoom.vue - 채팅방 + 툴바
- 컴포넌트
  - ChatMessaging.vue - 개별 채팅 메시지
  - ChatRoomList.vue - 채팅방 리스트
  - ChatWindow.vue - 채팅방 
  - PhotoUpload.vue - 이미지 업로드 버튼
  - UserList.vue - 사용자 리스트 


### 이벤트명 정의
  ```
  const EVENTS = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    JOIN: 'join',
    LEAVE: 'leave',
    IMAGE: 'image',
    CHAT: 'chat',
    INVITE_AVAILABLE_USERS: 'inviteAvailableUsers',
    INVITE: 'invite'
  } 
```
