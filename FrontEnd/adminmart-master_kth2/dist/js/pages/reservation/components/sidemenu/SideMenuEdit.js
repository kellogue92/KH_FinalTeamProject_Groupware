import Component from "../../core/Components.js";
import DateRangePicker from "./daterangepicker/DateRangePicker.js";

export default class SideMenuEdit extends Component {

  template () {
    return `
      <div class="col-12">
        <button id="addEventBtn" type="button" class="btn btn-outline-dark btn-block mb-1">예약 등록</button>
        <div id="editEventBtnGroup" class="btn-group d-none mb-1">
          <button id="editEventBtn" type="button" class="btn btn-outline-primary">수정</button>
          <button id="cancelEventBtn" type="button" class="btn btn-outline-dark"><i class="far fa-hand-point-up"></i></button>
          <button id="deleteEventBtn" type="button" class="btn btn-outline-danger">삭제</button>
        </div>
        <select name="calendar" class="custom-select custom-select-sm mb-1">
        </select>
        <input type="hidden" name="id" class="form-control">
        <input type="text" name="title" class="form-control form-control-sm text-center mb-1" placeholder="예약명">
        <div class="custom-control custom-control-sm custom-checkbox">
          <input type="checkbox" class="custom-control-input" name="allDay" id="allDayCheck">
          <label class="custom-control-label" for="allDayCheck">AllDay</label>
        </div>
        <input type="text" name="startDate" class="form-control form-control-sm text-center mb-1" placeholder="시작일" autocomplete="off">
        <input type="text" name="endDate" class="form-control form-control-sm text-center mb-1" placeholder="종료일" autocomplete="off">
      </div>
    `;
  } 

  setState (newState) {
    this.$state = { ...this.$state, ...newState };

    const { id=null, title=null, allDay=null, start=null, end=null, asNo=null, calendars=null, empName=null, display=null } = newState;

    // console.log(this.$state);

    const selectCalendar = this.$target.querySelector('select[name="calendar"]');

    if (calendars) {

      // console.log(calendars);

      selectCalendar.innerHTML = calendars.map((calendar, index) => {
        return `<option ${index === 0 ? "selected" : ""} value="${calendar.id}">${calendar.title}</option>`
      }).join('');

    } else if (title || allDay || start || end) {
      const editEventBtnGroup = this.$target.querySelector('#editEventBtnGroup');
      const addEventBtn = this.$target.querySelector('#addEventBtn');
      const editEventBtn = this.$target.querySelector('#editEventBtn');
      const deleteEventBtn = this.$target.querySelector('#deleteEventBtn');

      if (asNo) {
        selectCalendar.value = asNo;    
      }

      if (id === '') {
        addEventBtn.classList.remove("d-none");
        editEventBtnGroup.classList.remove("d-flex");
        editEventBtnGroup.classList.add("d-none");
      } else {
        addEventBtn.classList.add("d-none");
        editEventBtnGroup.classList.remove("d-none");
        editEventBtnGroup.classList.add("d-flex");
      }

      addEventBtn.disabled = display === 'background';
      editEventBtn.disabled = display === 'background';
      deleteEventBtn.disabled = display === 'background';

      const { daterangepicker } = this.$children;
      daterangepicker.setState({ ...this.$state });

      const inputId = this.$target.querySelector('input[name="id"]');
      inputId.value = id;

      const inputTitle = this.$target.querySelector('input[name="title"]');
      inputTitle.value = `${title}${display === "background" ? ` (${empName})` : ``}`;

      const checkAllDay = this.$target.querySelector('input[name="allDay"]');
      checkAllDay.checked = allDay;
    
    } else {
      this.render();
    }

  }

  mounted () {
    this.$children = {
      daterangepicker: new DateRangePicker(document.getElementById('jquery'), {}),
    }
  }

  setEvent () {

    const { insertEvent, editEvent, deleteEvent } = this.$props;

    const empNo = 201; // 임시

    // 이벤트 생성
    this.addEvent('click', '#addEventBtn', ({ target }) => {
      const id = this.$target.querySelector('input[name="id"]').value;
      const title = this.$target.querySelector('input[name="title"]').value;
      const start = this.$target.querySelector('input[name="startDate"]').value;
      const end = this.$target.querySelector('input[name="endDate"]').value;
      const allDay = this.$target.querySelector('input[name="allDay"]').checked;
      const asNo = this.$target.querySelector('select[name="calendar"]').value;

      // console.log('add', id, title, start, end);

      insertEvent({ id:'', title, start, end, allDay, asNo, empNo });
    });

    // 이벤트 수정
    this.addEvent('click', '#editEventBtn', ({ target }) => {
      const id = this.$target.querySelector('input[name="id"]').value;
      const title = this.$target.querySelector('input[name="title"]').value;
      const start = this.$target.querySelector('input[name="startDate"]').value;
      const end = this.$target.querySelector('input[name="endDate"]').value;
      const allDay = this.$target.querySelector('input[name="allDay"]').checked;
      const asNo = this.$target.querySelector('select[name="calendar"]').value;

      console.log('edit', id, title, start, end, allDay);

      editEvent({ id, title, start, end, allDay, asNo });
    });

    // 이벤트 삭제
    this.addEvent('click', '#deleteEventBtn', ({ target }) => {
      const id = this.$target.querySelector('input[name="id"]').value;
      const title = this.$target.querySelector('input[name="title"]').value;
      const start = this.$target.querySelector('input[name="startDate"]').value;
      const end = this.$target.querySelector('input[name="endDate"]').value;
      const allDay = this.$target.querySelector('input[name="allDay"]').checked;
      const asNo = this.$target.querySelector('select[name="calendar"]').value;

      // console.log('delete', id, title, start, end);

      deleteEvent({ id, title, start, end, allDay, asNo });
    });

    // 이벤트 등록버튼으로 되돌리기
    this.addEvent('click', '#cancelEventBtn', ({ target }) => {
      const editEventBtnGroup = this.$target.querySelector('#editEventBtnGroup');
      const addEventBtn = this.$target.querySelector('#addEventBtn');

      addEventBtn.classList.remove("d-none");
      editEventBtnGroup.classList.remove("d-flex");
      editEventBtnGroup.classList.add("d-none");
    });
  }

}