document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var storedPassword = localStorage.getItem(username);
    
    /*
    if (storedPassword && storedPassword === password) {
        localStorage.setItem('loggedInUser', username);  // 로그인 성공시 사용자 이름 저장
        alert('로그인 성공: ' + username);
        window.location.href = 'index.html';  // 로그인 성공 후 홈페이지로 리다이렉션
    } else {
        document.getElementById('loginError').innerText = '사용자 이름이나 비밀번호가 잘못되었습니다.';
        document.getElementById('loginError').style.color = 'red';
    }
    */
    if (storedPassword && storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        alert('로그인 성공: ' + username);
        console.log("로그인 성공 하였습니다 아이디 : " + username);
        window.location.href = 'home.html';  // 변경된 리다이렉션
    } else {
        document.getElementById('loginError').innerText = '사용자 이름이나 비밀번호가 잘못되었습니다.';
        document.getElementById('loginError').style.color = 'red';
        console.log("login fail");
    }
    
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;

    if (localStorage.getItem(newUsername)) {
        document.getElementById('registerMessage').innerText = '이미 존재하는 사용자 이름입니다.';
        document.getElementById('registerMessage').style.color = 'red';
        console.log("existing user login fail");
    } else {
        localStorage.setItem(newUsername, newPassword);  // 새 계정 정보 저장
        document.getElementById('registerMessage').innerText = '계정이 생성되었습니다.';
        document.getElementById('registerMessage').style.color = 'green';
        console.log("account created successfully");
    }
});

// 페이지 로드 시 로그인 상태 확인 및 사용자 메뉴 표시
window.onload = function() {
    displayUserMenu();
    console.log("user menu display mode");
};

// 사용자 메뉴 표시 및 숨김 토글
function toggleUserMenu() {
    var userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('open');  // CSS 클래스 'open'을 토글로 적용
}
document.addEventListener('DOMContentLoaded', function() {
    displayUserMenu();
    console.log("DOM content loaded")
});


function displayUserMenu() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        var userMenu = document.getElementById('userMenu');
        userMenu.innerHTML = `<strong>${loggedInUser}</strong> | <a href="profile.html">프로필 설정</a> | <a href="changePassword.html">비밀번호 변경</a> | <a href="#" onclick="logout()">로그아웃</a>`;
        userMenu.style.display = 'block';  // 메뉴를 보이도록 설정
    } else {
        userMenu.innerHTML = '<a href="login.html">로그인</a>'; // 로그인이 되어 있지 않을 경우 로그인 링크 제공
        userMenu.style.display = 'block';
    }
}



function logout() {
    localStorage.removeItem('loggedInUser');  // 로그인 상태 정보 제거
    console.log("login status deleted");
    window.location.href = 'index.html';  // 로그아웃 후 기본 페이지로 리다이렉션
    console.log("logged out, redirecting to default page");
}


// 비밀번호를 SHA-256 해시로 변환하는 함수
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
               .map(byte => byte.toString(16).padStart(2, '0'))
               .join('');
}

// 사용자 계정 생성 함수
async function register() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var hashedPassword = await hashPassword(password); // 비밀번호를 해시하여 저장
    localStorage.setItem(username, hashedPassword);
    alert('계정 생성 완료: ' + username);
    console.log("account created successfully");

}

// 사용자 로그인 처리 함수
async function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var hashedPassword = await hashPassword(password); // 입력된 비밀번호 해시
    var storedPassword = localStorage.getItem(username); // 저장된 해시된 비밀번호 불러오기
    if (hashedPassword === storedPassword) {
        alert('로그인 성공: ' + username);
        console.log('로그인 성공: ');
        localStorage.setItem('loggedInUser', username);  // 사용자 로그인 상태 저장
    } else {
        alert('로그인 실패: 사용자 이름 또는 비밀번호가 잘못되었습니다.');
        console.log(('로그인 실패: 사용자 이름 또는 비밀번호가 잘못되었습니다.'));
    }
}

// 사용자 로그아웃 처리 함수
function logout() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        localStorage.removeItem('loggedInUser'); // 로그인 상태 정보 제거
        alert('로그아웃 완료');
        console.log("log out complete");
    }
}
