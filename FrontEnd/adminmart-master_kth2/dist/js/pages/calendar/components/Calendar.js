import Component from "../core/Components.js";
import axios from '../axios.js'

export default class Calendar extends Component {
  calendar;

  constructor($target, $props) {
    super($target, $props);

    this.loadCalendar(1);
  }

  setup () {

    this.config = {
      height: '600px', // calendar 높이 설정
      expandRows: true, // 화면에 맞게 높이 재설정
      slotMinTime: '07:00', // Day 캘린더에서 시작 시간
      slotMaxTime: '24:00', // Day 캘린더에서 종료 시간
      // 헤더에 표시할 툴바
      headerToolbar: {
        start: 'timeGridDay,timeGridWeek,dayGridMonth',
        center: 'title',
        end: 'prev,today,next'
      },
      buttonText: {
        day: '일간',
        week: '주간',
        month: '월간',
      },
      views: {
        timeGridDay: {
          titleFormat: { year: '2-digit', month: 'numeric', day: 'numeric', weekday: 'short' },
        },
        timeGridWeek: { 
          titleFormat: { month: 'numeric', day: 'numeric' },
        },
        listYear: {
          titleFormat: { year: 'numeric' }
        }
      },
      initialView: 'dayGridMonth', // 초기 로드 될 때 보이는 캘린더 화면 (기본 설정 : 달)
      navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
      editable: true, // 수정 가능
      selectable: true, // 달력 일자 드래그 설정 가능
      nowIndicator: true, // 현재 시간 마크
      dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇개식으로 표현)
      locale: 'ko', // 한국어 설정
    };

  }

  template () {
    return `
      <div class="card-body">
        <div id="calendar"></div>
      </div>
    `;
  }

  mounted () {
  
  }

  loadCalendar = async (calNo) => {

    this.events = await this.readEvents(calNo);

    const $calendar = this.$target.querySelector('#calendar');
    this.calendar = new FullCalendar.Calendar($calendar, this.config);

    this.events.forEach(event => {
      this.calendar.addEvent(event);
    })

    this.setCalendar();

    this.calendar.render();

    console.log(this);
  }

  readEvents = async (calNo) => {
    const res = await axios.get(`selectEvtList.ca?calNo=${calNo}`);
    // console.log(res);

    const events = res.data.map((evt) => {
      return {
        id: evt.evtNo,
        title: evt.name,
        start: evt.startDate,
        end: evt.endDate,
      }
    });

    console.log(events);

    return events;
  }

  setCalendar = () => {
    // 이벤트 생성
    this.calendar.on('select', (info) => {
      const title = prompt('title 입력');

      console.log(this); // 이넘 자신이 calendar임

      if (title) {
        this.calendar.addEvent({
          title,
          start: info.start,
          end: info.end,
          allDay: info.view.type === 'dayGridMonth',
        });        
      }
    });

    // 이벤트 조회
    this.calendar.on('eventClick', (info) => {
      // 이벤트 수정 및 삭제가 가능하게 info에 조회라고 생각
      console.log('Event: ' + info.event.title);
      console.log('Color: ' + info.event.backgroundColor);

      // info.event.title = 'test'; // 이런식으로 변경 후 DB 변경
      // info.event.setProp("title", "test");
      // info.event.setProp("backgroundColor", "green");
    });

    // 이벤트 수정, 삭제
  }
}