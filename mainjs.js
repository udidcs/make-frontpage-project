// 함수 아닌 바로 실행되는 스크립트들
const imageList = document.querySelector(".section_middle_items");
// showmore 버튼이 클릭되면 무한스크롤 진행하기
document.querySelector(".section_middle_items_showmore").addEventListener('click', scroll);
// showmore 버튼이 클릭되면 하단 부분 사라지게 하기
document.querySelector(".section_middle_items_showmore").addEventListener('click', setting);
// 구독 버튼 누르면 모달창 띄우면서 배경 불투명하게 만들기
document.querySelector(".footer_top_blogpost_input_subscribe").addEventListener('click', ()=>{
    document.querySelector("header").style.opacity= "0.15";
    document.querySelector("section").style.opacity= "0.15";
    document.querySelector("footer").style.opacity= "0.15";
    document.querySelector(".modal").style.display= "flex";
});
// okilovehodu 버튼 누르면 모달창 닫고 주변 배경 원래대로
document.querySelector(".modal_okilovehodu").addEventListener('click', ()=>{
    document.querySelector("header").style.opacity= "1";
    document.querySelector("section").style.opacity= "1";
    document.querySelector("footer").style.opacity= "1";
    document.querySelector(".modal").style.display= "none";
});

// picsum에서 가져올 페이지 번호
let pageToFetch = 1;
// 무한스크롤 구현시 필요한 timer
let timer = null;

// showmore 버튼이 클릭되면 하단 부분 사라지게 하는 함수
function setting() {
    
    document.querySelector(".section_middle_bottom").style.display= "none";
    document.querySelector(".section_bottom").style.display= "none";
    document.querySelector(".section_map").style.display= "none";
    document.querySelector(".footer_top").style.display= "none";
    
    // 제일 하단 부분 고정되게 하기
    const fb = document.querySelector(".footer_bottom");
    fb.style.position = "fixed";
    fb.style.bottom = "0px";
    fb.style.zindex = "998";
    fb.style.background = "white";

    // 제일 하단 부분에 해당하는 영역의 윗 마진을 주기 위해 삽입된 margindiv 보이게 하기
    document.querySelector(".margindiv").style.display= "block";
    
}

function scroll() {
    window.addEventListener("scroll", ()=>{
    // 스크롤이 상단으로부터 얼마나 이동했는지 알아야합니다. (뷰포트의 높이 + 스크롤된 길이)
    // 화면에 로딩된 페이지의 전체 높이
    // 뷰포트의 높이 + 스크롤된 길이 + 10 === 화면에 로딩된 페이지의 전체 높이

    if(window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight){
        if (timer === null) {
            fetchImages(pageToFetch++);
            timer = setTimeout(() => {
                timer = null;
            }, 500);
        }
    }});
}

async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=9');
        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }

        const datas = await response.json();
        makeImageList(datas);

    } catch (error) {
        console.error("데이터를 가져오는데 문제가 발생했습니다 :", error);
    }
}



function makeImageList(datas){
    
    let cnt = 0;    
    plus = "";
    datas.forEach((item)=>{
        cnt += 1;
        // 한줄에 3개씩 보이게 하기 위해 %3
        // class 태그 넣어 주기 위해 시작태그 삽입
        if (cnt % 3 == 1) {
            plus += "<div class='section_middle_moreitems_row'>";
        }
        plus += "<img src="+ item.download_url +" alt=''>";
        // class 태그 넣어 주기 위해 닫는태그 삽입
        if (cnt % 3 == 0) {
            plus += "</div>";
            imageList.innerHTML += plus;
            plus = "";
        }
    }); 
}