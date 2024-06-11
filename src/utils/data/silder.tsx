import {Images} from 'assets';
import SvgIconNew from 'assets/IconSVG';
import React from 'react';
import {Colors} from 'theme';

export const datasfuntions = [
  {
    id: 2526,
    title: 'survey',
    icon: 'newspaper',
    screen: 'SurveyList',
    bgColor: Colors.colorDA,
    render: () => <SvgIconNew.Document />,
  },
  {
    id: 327,
    title: 'schedule.schedule',
    icon: 'calendar',
    screen: 'Schedule',
    bgColor: Colors.colorFCA,
    render: () => <SvgIconNew.Calendar />,
  },
];

export const newsList = [
  {category: 'NEWTYPE', code: '01', name: 'news', id: 1825},
  {category: 'EVETYPE', code: '01', name: 'events', id: 1839},
  {category: 'POMTYPE', code: '01', name: 'promotions', id: 1846},
];

export const slidesIntro = [
  {
    index: 1,
    image: Images.intro_01,
    title: 'EXC',
    text: 'Nơi gắn kết tài xế',
  },
  {
    index: 2,
    image: Images.intro_02,
    title: 'EXC',
    text: 'Giới thiệu khách hàng',
  },
  {
    index: 3,
    image: Images.intro_03,
    title: 'EXC',
    text: 'Anh em tài xế cùng phát triển',
  },
];

export const surveyCompleteSlider = [
  {
    id: '1',
    title: 'Leman Luxury',
    img: Images.survey_complete,
  },
];

export const generateFile = (value: string) => {
  if (value) {
    if (value.includes('png')) {
      return <SvgIconNew.PNG />;
    } else if (value.includes('jpg')) {
      return <SvgIconNew.JPG />;
    } else if (value.includes('docx')) {
      return <SvgIconNew.DOCX />;
    } else if (value.includes('pdf')) {
      return <SvgIconNew.PDF />;
    } else if (value.includes('ppt')) {
      return <SvgIconNew.PPT />;
    } else if (value.includes('rar')) {
      return <SvgIconNew.RAR />;
    } else if (value.includes('txt')) {
      return <SvgIconNew.TXT />;
    } else if (value.includes('xsl')) {
      return <SvgIconNew.XSL />;
    } else if (value.includes('zip')) {
      return <SvgIconNew.ZIP />;
    } else {
      return <SvgIconNew.PDF />;
    }
  }
};

export const STATUS_TICKET = [
  {
    id: 1,
    title: 'ticket.waiting',
    status: 'O',
  },
  {
    id: 2,
    title: 'ticket.processing',
    status: 'P',
  },
  {
    id: 3,
    title: 'ticket.complete',
    status: 'D',
  },
];

export const CONTRACT_INFORMATION = [
  {
    id: 1,
    title: 'product.payment_information',
  },
  {
    id: 2,
    title: 'product.general_information',
  },
  {
    id: 3,
    title: 'product.customer_information',
  },
];
