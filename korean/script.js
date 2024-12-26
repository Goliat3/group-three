// API 호출하여 데이터를 가져오는 함수
async function fetchQuizData() {
    const response = await fetch('/api/quiz');
    return response.json();
}

// 데이터를 렌더링하는 함수
async function renderQuiz() {
    try {
        const data = await fetchQuizData();

        // 지문 이미지 설정
        const passageImage = document.getElementById('passage-image');
        passageImage.src = data.passageImage;

        // 선지 생성
        const choiceList = document.getElementById('choice-list');
        choiceList.innerHTML = ''; // 초기화
        data.choices.forEach(choice => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = choice.text;

            button.addEventListener('click', () => {
                if (choice.isCorrect) {
                    alert('정답입니다!');
                } else {
                    alert('오답입니다.');
                }
            });

            listItem.appendChild(button);
            choiceList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading quiz data:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', renderQuiz);
