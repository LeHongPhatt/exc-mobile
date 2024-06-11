import Icon from 'assets/svg/Icon';
import {HomeLayout, SelecterPicker, TextCus, TouchCus} from 'components';
import {BottomSheetCommon} from 'components/BottomSheet';
import {useNotify, useStatistic} from 'hooks';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, InteractionManager, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {
  EAction,
  EStatisticTab,
  IRefBottom,
  IStatistic,
  IStatisticParams,
  SELECT_OPTION,
} from 'types';
import {
  checkDayIsAfter,
  formatCurrency,
  formatDMY,
  formatDMYIso,
  getHeight,
  getNow,
  getPrevDay,
  getPrevMonth,
  getWidth,
  styleSpacing,
} from 'utils';
import styles from './styles';

const Statistic = () => {
  const [action, setAction] = useState('');
  const [tabActive, setTabActive] = useState<EStatisticTab>(EStatisticTab.post);
  const [statistic, setStatistic] = useState<IStatistic | null>(null);
  const [startDate, setStartDate] = useState<string>(getPrevMonth());
  const [endDate, setEndDate] = useState<string>(getNow());
  const [search, setSearch] = useState<string>('');
  const refModalStartDate = useRef<IRefBottom>(null);
  const refModalEndDate = useRef<IRefBottom>(null);
  const {onGetStatistic} = useStatistic();
  const {info} = useNotify();

  useEffect(() => {
    _onGetStatistic({
      page: 1,
      limit: 10,
      type: tabActive,
      startTime: formatDMYIso(startDate),
      endTime: formatDMYIso(endDate),
    });
  }, [onGetStatistic, tabActive, startDate, endDate]);

  const _onGetStatistic = ({
    page,
    limit,
    type,
    startTime,
    endTime,
    keyword,
  }: IStatisticParams) => {
    onGetStatistic(
      {
        page: page,
        limit: limit,
        type: type,
        startTime: startTime,
        endTime: endTime,
        keyword: keyword,
      },
      rs =>
        Array.isArray(rs?.data?.result) && setStatistic(rs?.data?.result[0]),
    );
  };

  const _onChangeTab = (tab: EStatisticTab) => {
    setTabActive(tab);
  };

  const mapBgByStatus = (status: EAction) => {
    switch (status) {
      case EAction.PENDING:
        return styles.pending;
      case EAction.RECEIVED:
        return styles.received;
      case EAction.CANCELED:
        return styles.canceled;
      case EAction.COMPLAIN:
        return styles.complain;
      default:
        return;
    }
  };

  const _onConfirmStartDate = (date: any) => {
    if (checkDayIsAfter(formatDMY(date), endDate)) {
      setStartDate(formatDMY(date));
      InteractionManager.runAfterInteractions(() => {
        refModalStartDate.current?.close();
        refModalEndDate.current?.show();
      });
    } else {
      info('Thông báo', 'Ngày bắt đầu không được lớn hơn ngày kết thúc');
    }
  };

  const _onConfirmEndDate = (date: any) => {
    if (checkDayIsAfter(startDate, formatDMY(date))) {
      setEndDate(formatDMY(date));
      InteractionManager.runAfterInteractions(() => {
        refModalEndDate.current?.close();
      });
    } else {
      info('Thông báo', 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
    }
  };

  const _onSearchStatistic = (text: string) => {
    _onGetStatistic({
      page: 1,
      limit: 10,
      type: tabActive,
      startTime: formatDMYIso(startDate),
      endTime: formatDMYIso(endDate),
      keyword: text,
    });
  };

  const headerProps = {
    notGoBack: true,
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Thống kê
      </TextCus>
    ),
    renderRight: () => (
      <TouchCus onPress={() => setAction(EAction.SEARCH)}>
        <Icon.Search />
      </TouchCus>
    ),
  };

  const itemDivider = () => {
    return <View style={getHeight(12)} />;
  };

  const renderTransactionItem = useCallback(({item}) => {
    return (
      <TouchCus key={item} onPress={() => {}}>
        <View
          style={[
            styles.wrapCard,
            styles.wrapShadow,
            styles.cenItem,
            styles.row,
            styleSpacing('px-12'),
            styleSpacing('py-8'),
          ]}>
          {Icon.LocationInfo({color: Colors.mainLight})}
          <View style={[styles.flex1, styleSpacing('ml-8')]}>
            <View style={[styles.row, styles.spaceItem]}>
              <View
                style={[
                  styles.radius37,
                  styleSpacing('px-8'),
                  styleSpacing('py-4'),
                  {backgroundColor: Colors.cardOwner},
                ]}>
                <TextCus label2>{`#${item?.drive_code}`}</TextCus>
              </View>
              <View
                style={[
                  styles.radius37,
                  styleSpacing('px-8'),
                  styleSpacing('py-4'),
                  mapBgByStatus(item?.status),
                ]}>
                <TextCus label2 whiteColor useI18n>
                  {item?.status}
                </TextCus>
              </View>
            </View>
            <TextCus mainLightColor body2 medium mt-4>
              {item?.name}
            </TextCus>
            <View style={[styles.row, styles.spaceItem, styleSpacing('mt-4')]}>
              <TextCus caption1 bgInput>
                {formatDMY(item?.createdAt)}
              </TextCus>
              <TextCus caption1 mainLightColor medium style={styles.shrinkTxt}>
                {`${formatCurrency(item?.amount)}`}đ
              </TextCus>
            </View>
          </View>
        </View>
      </TouchCus>
    );
  }, []);

  const optAction = {action, setAction};

  return (
    <>
      <HomeLayout
        statusBarMode={'dark-content'}
        safeAreaEdges={['left', 'top', 'right']}
        header={{...headerProps}}
        {...optAction}
        inputProps={{
          onChangeText: text => {
            setSearch(text);
            setTimeout(() => _onSearchStatistic(text), 2000);
          },
          value: search,
        }}
        onPress={() => _onSearchStatistic(search)}>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchCus
              style={styles.flex1}
              onPress={() => _onChangeTab(EStatisticTab.post)}>
              <View
                style={[
                  styles.cenItemvh,
                  getHeight(33),
                  tabActive === EStatisticTab.post
                    ? styles.tabSelected
                    : styles.tabUnselected,
                ]}>
                <TextCus
                  caption1
                  medium
                  mainLightColor={tabActive === EStatisticTab.post}
                  bgInput={tabActive === EStatisticTab.pick}>
                  Cuốc đăng
                </TextCus>
              </View>
            </TouchCus>
            <TouchCus
              style={styles.flex1}
              onPress={() => _onChangeTab(EStatisticTab.pick)}>
              <View
                style={[
                  styles.cenItemvh,
                  getHeight(33),
                  tabActive === EStatisticTab.pick
                    ? styles.tabSelected
                    : styles.tabUnselected,
                ]}>
                <TextCus
                  caption1
                  medium
                  mainLightColor={tabActive === EStatisticTab.pick}
                  bgInput={tabActive === EStatisticTab.post}>
                  Cuốc nhận
                </TextCus>
              </View>
            </TouchCus>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styleSpacing('pt-16')]}>
            <TouchCus
              style={[styles.cenItem, styleSpacing('mx-16')]}
              onPress={() => refModalStartDate.current?.show()}>
              <View
                style={[
                  styles.row,
                  styles.cenItem,
                  styles.radius4,
                  styles.borderWhisper,
                  styleSpacing('px-12'),
                  styleSpacing('py-12'),
                ]}>
                <View style={styles.flex1}>
                  <TextCus>
                    {startDate} - {endDate}
                  </TextCus>
                </View>
                <View style={getWidth(12)} />
                {Icon.ChevronRight({color: Colors.dark, width: 24, height: 24})}
              </View>
            </TouchCus>
            {statistic && (
              <View
                style={[
                  styles.borderWhisper,
                  styles.radius4,
                  styleSpacing('mt-16'),
                  styleSpacing('mx-16'),
                ]}>
                <View
                  style={[
                    styles.row,
                    styles.spaceItem,
                    styleSpacing('px-16'),
                    styleSpacing('py-12'),
                  ]}>
                  <TextCus body2 style={styles.shrinkTxt}>
                    Tổng cuốc xe
                  </TextCus>
                  <TextCus body2 ml-12>
                    {`${statistic?.total_drive ?? 0} cuốc`}
                  </TextCus>
                </View>
                <Divider
                  style={[getHeight(1), {backgroundColor: Colors.whisper}]}
                />
                <View
                  style={[
                    styles.row,
                    styles.spaceItem,
                    styleSpacing('px-16'),
                    styleSpacing('py-12'),
                  ]}>
                  <TextCus style={styles.shrinkTxt}>
                    <TextCus body2>Hoàn tất cuốc </TextCus>
                    {statistic?.finish_drive?.percent && (
                      <TextCus body2 mainLightColor>
                        {`${statistic?.finish_drive?.percent}%`}
                      </TextCus>
                    )}
                  </TextCus>
                  <TextCus body2 ml-12>
                    {`${statistic?.finish_drive?.quantity ?? 0} cuốc`}
                  </TextCus>
                </View>
                <Divider
                  style={[getHeight(1), {backgroundColor: Colors.whisper}]}
                />
                <View
                  style={[
                    styles.row,
                    styles.spaceItem,
                    styleSpacing('px-16'),
                    styleSpacing('py-12'),
                  ]}>
                  <TextCus style={styles.shrinkTxt}>
                    <TextCus body2>Hủy cuốc xe </TextCus>
                    {statistic?.canceled_drive?.percent && (
                      <TextCus body2 mainLightColor>
                        {`${statistic?.canceled_drive?.percent}%`}
                      </TextCus>
                    )}
                  </TextCus>
                  <TextCus body2 ml-12>
                    {`${statistic?.canceled_drive?.quantity ?? 0} cuốc`}
                  </TextCus>
                </View>
                <Divider
                  style={[getHeight(1), {backgroundColor: Colors.whisper}]}
                />
                <View
                  style={[
                    styles.row,
                    styles.spaceItem,
                    styleSpacing('px-16'),
                    styleSpacing('py-12'),
                  ]}>
                  <TextCus body2 style={styles.shrinkTxt}>
                    Trung bình
                  </TextCus>
                  <TextCus body2 ml-12>
                    {`${statistic?.average_a_day ?? 0} cuốc/ngày`}
                  </TextCus>
                </View>
              </View>
            )}
            {statistic?.drives && (
              <View style={styles.flex1}>
                <FlatList
                  data={statistic.drives}
                  scrollEnabled={false}
                  contentContainerStyle={[
                    styleSpacing('py-16'),
                    styleSpacing('px-16'),
                  ]}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={itemDivider}
                  renderItem={renderTransactionItem}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </HomeLayout>
      <BottomSheetCommon
        ref={refModalStartDate}
        pressBehavior="close"
        hideBackdrop>
        <SelecterPicker
          selectOptionTitle={'Từ ngày'}
          selectType={SELECT_OPTION.DATE_PICKER}
          maxDate={getPrevDay()}
          onCancelSelect={() => refModalStartDate.current?.close()}
          onConfirmSelect={_onConfirmStartDate}
          selectedPickerDate={startDate}
        />
      </BottomSheetCommon>
      <BottomSheetCommon
        ref={refModalEndDate}
        pressBehavior="close"
        hideBackdrop>
        <SelecterPicker
          selectOptionTitle={'Đến ngày'}
          selectType={SELECT_OPTION.DATE_PICKER}
          maxDate={getNow()}
          onCancelSelect={() => refModalEndDate.current?.close()}
          onConfirmSelect={_onConfirmEndDate}
          selectedPickerDate={endDate}
        />
      </BottomSheetCommon>
    </>
  );
};

export default Statistic;
