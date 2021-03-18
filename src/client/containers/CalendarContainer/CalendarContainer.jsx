/* eslint-disable react/sort-comp */
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDays, eachDayOfInterval, startOfWeek, add, sub } from 'date-fns';
import { mergingTasksBasedOnDate } from '@app/utils';
import { calendarTasksSelector } from '@app/selectors';
import { CreateTaskModalContainer } from '@app/containers/modals';
import CalendarHeader from './Header';
import CalendarBody from './CalendarBody/CalendarBody';

class CalendarContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentDate: new Date(),
      numberOfDays: 7,
      type: 'weekly',
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.setToday = this.setToday.bind(this);
  }

  getWeeklyDays() {
    const { currentDate, numberOfDays } = this.state;
    const firtDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endDayOfWeek = addDays(firtDayOfWeek, numberOfDays - 1);
    const days = eachDayOfInterval({
      start: firtDayOfWeek,
      end: endDayOfWeek,
    });

    return days;
  }

  /**
   * Next week if is weekly calendar,
   * next month if monthly calendar.
   */
  next() {
    const { currentDate } = this.state;

    this.setState((state) => ({
      ...state,
      currentDate: add(currentDate, { weeks: 1 }),
    }));
  }

  /**
   * Previous week if is weekly  calendar,
   * previous month if monthly calendar.
   */
  previous() {
    const { currentDate } = this.state;

    this.setState((state) => ({
      ...state,
      currentDate: sub(currentDate, { weeks: 1 }),
    }));
  }

  /**
   * Set today a current day.
   */
  setToday() {
    this.setState((state) => ({
      ...state,
      currentDate: new Date(),
    }));
  }

  /**
   * Extract days for calendar
   */
  calendarDates() {
    const { type } = this.state;

    if (type === 'weekly') {
      const weekDates = this.getWeeklyDays();
      return this.mergeDataWithDates(weekDates);
    }

    return [];
  }

  mergeDataWithDates(dates) {
    const { tasks } = this.props;
    return mergingTasksBasedOnDate(dates, tasks);
  }

  render() {
    const { currentDate } = this.state;

    return (
      <>
        <div className="bg-white p-2">
          <CalendarHeader
            currentDate={currentDate}
            setNext={this.next}
            setPrev={this.previous}
            setToday={this.setToday}
          />
          <CalendarBody calendarDates={this.calendarDates()} />
        </div>

        {/* start: Modal to create task */}
        <CreateTaskModalContainer />
        {/* end: Modal to create task */}
      </>
    );
  }
}

CalendarContainer.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  tasks: calendarTasksSelector(state),
});

export default connect(mapStateToProps)(CalendarContainer);
