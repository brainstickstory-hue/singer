# 가수 소개 정적 웹사이트

HTML5, CSS3, Vanilla JavaScript로 제작된 완전한 정적 웹사이트입니다.

## 📁 프로젝트 구조

```
singer/
├── index.html              # 랜딩 페이지
├── profile.html            # 프로필 페이지
├── albums.html             # 앨범 페이지
├── gallery.html            # 갤러리 페이지
├── performances.html       # 공연 일정 페이지
├── contact.html            # 연락하기 페이지
├── assets/
│   ├── css/
│   │   └── style.css      # 메인 스타일시트
│   ├── js/
│   │   └── main.js        # 메인 JavaScript
│   ├── images/            # 이미지 폴더 (비어있음)
│   └── data/              # 데이터 폴더 (비어있음)
└── README.md
```

## ✨ 주요 기능

### 공통 기능
- **반응형 디자인**: 모바일 퍼스트 접근 방식
- **접근성**: Semantic HTML, ARIA 속성, 키보드 네비게이션 지원
- **통일된 헤더/푸터**: 모든 페이지에서 일관된 네비게이션
- **Active 상태 표시**: 현재 페이지 자동 하이라이트
- **모바일 메뉴**: 햄버거 메뉴로 반응형 네비게이션

### 페이지별 기능

#### 1. index.html (랜딩)
- Hero 섹션
- 소개 섹션
- 대표 앨범 카드
- 다가오는 공연 정보
- CTA (Call to Action)

#### 2. profile.html
- 프로필 개요
- 경력 타임라인
- 수상 및 성과
- 음악 스타일 소개

#### 3. albums.html
- 최신 앨범 상세 정보
- 이전 앨범 목록
- 싱글 & 미니앨범
- 뮤직비디오 갤러리
- 스트리밍 플랫폼 링크

#### 4. gallery.html
- 공연 사진
- 화보 촬영
- 비하인드 스토리
- 팬들과 함께한 순간
- 영상 갤러리

#### 5. performances.html
- 다가오는 공연 상세 정보
- 전국 투어 일정
- 지난 공연 기록
- 티켓 예매 안내
- FAQ
- 뉴스레터 구독

#### 6. contact.html
- 문의 폼
- 연락처 정보
- 비즈니스 문의 안내
- 팬레터 주소
- 소셜 미디어 링크
- 오시는 길

## 🎨 디자인 특징

### 색상 팔레트
- Primary: #2c3e50 (네이비)
- Secondary: #e74c3c (레드)
- Accent: #3498db (블루)
- Background: #fff / #f8f9fa

### 타이포그래피
- 본문: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- 제목: Georgia, Times New Roman, serif

### 반응형 브레이크포인트
- Desktop: > 768px
- Tablet: ≤ 768px
- Mobile: ≤ 480px

## 🔧 JavaScript 기능

### main.js
- 모바일 메뉴 토글
- Active 네비게이션 링크 자동 설정
- 부드러운 스크롤
- 폼 유효성 검사
- 이미지 지연 로딩
- 현재 연도 자동 업데이트

## ♿ 접근성 기능

- Semantic HTML5 태그 사용
- ARIA 레이블 및 속성
- 키보드 네비게이션 지원
- Focus 스타일 적용
- Skip to main content 링크
- Alt 텍스트 제공
- Reduced motion 미디어 쿼리 지원

## 🚀 사용 방법

1. 웹 브라우저로 `index.html` 파일을 엽니다
2. 프레임워크나 빌드 도구 없이 바로 실행됩니다
3. 로컬 서버 실행 (선택사항):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server 설치 필요)
   npx http-server
   ```

## 📝 커스터마이징 가이드

### 색상 변경
`assets/css/style.css`의 `:root` 변수를 수정하세요:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
}
```

### 이미지 추가
1. `assets/images/` 폴더에 이미지 파일 추가
2. HTML에서 이모지 대신 이미지 태그로 교체:
```html
<img src="assets/images/your-image.jpg" alt="설명">
```

### 콘텐츠 수정
각 HTML 파일을 열어 더미 텍스트를 실제 콘텐츠로 교체하세요.

## 🌐 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저

## 📄 라이선스

이 프로젝트는 학습 및 개인 프로젝트 용도로 자유롭게 사용 가능합니다.

## 🤝 기여

개선 사항이나 버그 리포트는 언제든 환영합니다!

---

**제작일**: 2026년 1월
**기술 스택**: HTML5, CSS3, Vanilla JavaScript
**특징**: 프레임워크 없음, 완전한 정적 사이트, 모바일 퍼스트 반응형

