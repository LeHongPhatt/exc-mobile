import {View, ScrollView, FlatList, InteractionManager} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  HomeLayout,
  TextCus,
  ImageCus,
  TouchCus,
  SelecterPicker,
  BottomSheetPicker,
} from 'components';
import {BottomSheetCommon} from 'components/BottomSheet';
import styles from './styles';
import {
  getHeight,
  getWidth,
  styleSpacing,
  formatHMDMY,
  formatCurrency,
  getNow,
  getPrevMonth,
  formatDMY,
  getPrevDay,
  checkDayIsAfter,
  formatDMYIso,
} from 'utils';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {
  EFilterType,
  ITransaction,
  ITransactionParams,
  SELECT_OPTION,
} from 'types';
import {useAuth, useNotify, useTransaction} from 'hooks';
import BottomSheet from '@gorhom/bottom-sheet';

const Transaction = () => {
  const [filterType, setFilterType] = useState<EFilterType | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const [me, setMe] = useState();
  const [startDate, setStartDate] = useState<string>(getPrevMonth());
  const [endDate, setEndDate] = useState<string>(getNow());
  const refModalStartDate = useRef<BottomSheet>(null);
  const refModalEndDate = useRef<BottomSheet>(null);
  const {onGetTransaction} = useTransaction();
  const [page, setPage] = useState();
  const {profile} = useAuth();
  const {info} = useNotify();

  const _onGetTransaction = ({
    page,
    limit,
    type,
    startTime,
    endTime,
  }: ITransactionParams) => {
    onGetTransaction(
      {
        page: page,
        limit: limit,
        type: type,
        start_time: startTime,
        end_time: endTime,
      },
      rs => {
        const newTransactions = rs?.data?.result;
        if (Array.isArray(newTransactions)) {
          setTransactions(prevTransactions =>
            page === 1
              ? newTransactions
              : [...prevTransactions, ...newTransactions],
          );
        }
      },
    );
  };

  const _getAmount = (amount: number, type: EFilterType) => {
    if (type === EFilterType.decrease) {
      return `-${formatCurrency(amount)} EXC-xu`;
    } else {
      return `+${formatCurrency(amount)} EXC-xu`;
    }
  };

  const _onChooseFilter = (filter: EFilterType | null) => {
    // setFilterType(filter);
    setFilterType(filter === filterType ? null : filter);
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

  useEffect(() => {
    _onGetTransaction({
      page: 1,
      limit: 10,
      type: filterType,
      startTime: formatDMYIso(startDate),
      endTime: formatDMYIso(endDate),
    });
  }, [filterType, startDate, endDate]);

  useEffect(() => {
    profile && setMe(profile[0]);
  }, [profile]);

  const headerProps = {
    notGoBack: true,
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Giao dịch
      </TextCus>
    ),
  };

  const itemDivider = () => {
    return <View style={getHeight(12)} />;
  };

  const onLoadmore = () => {
    console.log('onLoadMore', page);
    _onGetTransaction({page: page + 1});
    setPage(page + 1);
    // const nextPage = page || 1;
    // _onGetTransaction({
    //   page: nextPage,
    //   limit: 10,
    //   type: filterType,
    //   startTime: formatDMYIso(startDate),
    //   endTime: formatDMYIso(endDate),
    // });
    // setPage(nextPage);
  };

  const renderTransactionItem = useCallback(({item, index}) => {
    return (
      <View key={index} style={[styleSpacing('py-4')]}>
        <View style={[styles.row, styles.spaceItem]}>
          <TextCus caption1 medium style={styles.shrinkTxt}>
            {item?.title}
          </TextCus>
          {item?.amount && item?.type && (
            <TextCus caption1 medium ml-12>
              {_getAmount(item.amount, item.type)}
            </TextCus>
          )}
        </View>
        <TextCus caption1 bgInput mt-4>
          {formatHMDMY(item?.createdAt, ' - ')}
        </TextCus>
      </View>
    );
  }, []);

  return (
    <>
      <HomeLayout
        statusBarMode={'dark-content'}
        safeAreaEdges={['left', 'top', 'right']}
        header={{...headerProps}}>
        <View style={styles.container}>
          <ImageCus
            source={Images.transaction_bg}
            style={[
              styles.wrapCard,
              styles.cenItemvh,
              styleSpacing('mx-16'),
              styleSpacing('mt-10'),
              styleSpacing('mb-16'),
            ]}>
            <TextCus title4 whiteColor medium>
              Tài khoản
            </TextCus>
            <View style={getHeight(7)} />
            {me && (
              <TextCus whiteColor bold style={[styles.fs24, styles.lh34]}>
                {formatCurrency(me?.balance_available)}
              </TextCus>
            )}
            <View style={getHeight(7)} />
            <TextCus title4 whiteColor>
              EXC-xu
            </TextCus>
          </ImageCus>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styleSpacing('px-16')}>
              <View
                style={[
                  styles.row,
                  styles.cenItemvh,
                  styles.borderWhisper,
                  styles.radius100,
                  getHeight(28),
                  styleSpacing('px-12'),
                ]}>
                <Icon.Sort />
                <TextCus caption1 ml-6>
                  Bộ lọc
                </TextCus>
              </View>
              <TouchCus onPress={() => _onChooseFilter(null)}>
                <View
                  style={[
                    styles.radius100,
                    filterType === null ? styles.active : styles.deactive,
                    styles.cenItemvh,
                    getHeight(28),
                    styleSpacing('px-8'),
                    styleSpacing('ml-8'),
                  ]}>
                  <TextCus
                    caption1
                    whiteColor={filterType === null}
                    bgInput={filterType !== null}>
                    Tất cả
                  </TextCus>
                </View>
              </TouchCus>
              <TouchCus onPress={() => _onChooseFilter(EFilterType.increase)}>
                <View
                  style={[
                    styles.radius100,
                    filterType === EFilterType.increase
                      ? styles.active
                      : styles.deactive,
                    styles.cenItemvh,
                    getHeight(28),
                    styleSpacing('px-8'),
                    styleSpacing('ml-8'),
                  ]}>
                  <TextCus
                    caption1
                    whiteColor={filterType === EFilterType.increase}
                    bgInput={filterType !== EFilterType.increase}>
                    Cộng EXC-xu
                  </TextCus>
                </View>
              </TouchCus>
              <TouchCus onPress={() => _onChooseFilter(EFilterType.decrease)}>
                <View
                  style={[
                    styles.radius100,
                    filterType === EFilterType.decrease
                      ? styles.active
                      : styles.deactive,
                    styles.cenItemvh,
                    getHeight(28),
                    styleSpacing('px-8'),
                    styleSpacing('ml-8'),
                  ]}>
                  <TextCus
                    caption1
                    whiteColor={filterType === EFilterType.decrease}
                    bgInput={filterType !== EFilterType.decrease}>
                    Trừ EXC-xu
                  </TextCus>
                </View>
              </TouchCus>
            </ScrollView>
          </View>
          <View style={getHeight(16)} />
          <View
            style={[
              styles.flex1,
              styles.wrapShadow,
              styles.wrapContent,
              styleSpacing('px-16'),
              styleSpacing('pt-8'),
            ]}>
            <View style={styles.cenItem}>
              <View
                style={[
                  styles.radius29,
                  {backgroundColor: Colors.dark},
                  getWidth(32),
                  getHeight(3),
                ]}
              />
            </View>
            <View style={getHeight(12)} />
            <TouchCus
              style={styles.cenItem}
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
            {transactions && (
              <View style={styles.flex1}>
                <FlatList
                  data={transactions}
                  scrollEnabled={true}
                  contentContainerStyle={[styleSpacing('py-16')]}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={itemDivider}
                  renderItem={renderTransactionItem}
                  onEndReached={onLoadmore}
                  onEndReachedThreshold={0.5}
                />
              </View>
            )}
          </View>
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

export default Transaction;
