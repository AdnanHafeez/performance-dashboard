
import React from 'react';
import PropTypes from 'prop-types';

import Donut from './svgs/donut';
import { statusColors } from './../constants/styleVariables';
import {humanisedShortDate, getHumanisedVeryShortDate} from 'shared/utils/formatDates';
import {getNumMonthsBetweenLastUpdatedAndLatestPossible} from 'shared/redux/slices/slicesSelectors';
import isNumber from 'lodash/isNumber';


const STATUSES = [
  {
    label: 'UP TO DATE',
    color: statusColors.COLOR_SUCCESS
  },
  {
    label: 'TO DO',
    color: statusColors.COLOR_WARNING
  },
  {
    label: 'OVERDUE',
    color: statusColors.COLOR_ERROR
  }
];

const TrafficLight = ({dateSeriesEnd, datePublished}) => {

  if (!dateSeriesEnd) {
    return null;
  }

  const numMonths = getNumMonthsBetweenLastUpdatedAndLatestPossible(dateSeriesEnd);

  if (!isNumber(numMonths) || numMonths < 0) {
    return null;
  }

  const status = numMonths >= 2 ? STATUSES[2] : STATUSES[numMonths];

  return (
    <div className="traffic-light">
      <span className="traffic-light__top">
        <span className="status-key-group">
          <span className="status-key">
            <Donut innerColor="white" strokeColor={status.color} />
          </span>
          <span className="status-label">{status.label}</span>
        </span>
      </span>

      <span className="traffic-light__bottom">
        <span className="traffic-light__bottom__left">
          Published date: <time>{humanisedShortDate(datePublished)}</time>
        </span>
        {dateSeriesEnd && <span className="traffic-light__bottom__right">
          Most recent data: <time>{getHumanisedVeryShortDate(dateSeriesEnd)}</time>
        </span>}
      </span>
    </div>
  )
};

if (__DEV__) {
  TrafficLight.propTypes = {
    datePublished: PropTypes.string,
    dateSeriesEnd: PropTypes.string
  };
}

export default TrafficLight;
