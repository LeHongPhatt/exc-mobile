import Icon from 'assets/svg/Icon';
import {
  SafeAreaStatusBar,
  SafeAreaViewCus,
  Header,
  IconCus,
  TextInputs,
  TouchCus,
} from 'components';
import React, {useCallback} from 'react';
import {Colors} from 'theme';
import {EAction, TmodeContent} from 'types';
import styles from './styles';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import {isIos} from 'utils';

const HomeLayout = (props: IMainLayoutProps) => {
  const {
    children,
    bgColor,
    statusBarMode,
    header,
    setAction,
    action,
    safeAreaEdges,
    inputProps,
    onPress,
  } = props;

  const headerCustom = useCallback(() => {
    switch (action) {
      case EAction.SEARCH:
        return (
          <Header
            onPressLeft={() => {
              setAction?.(null);
              Keyboard.dismiss();
            }}
            showCenter={false}
            renderLeft={() => (
              <IconCus name={'chevron-left'} size={18} color={Colors.white} />
            )}
            renderRight={() => (
              <TextInputs
                style={styles.inputSearch}
                placeholder={'Tìm kiếm'}
                rightIcon={
                  <TouchCus onPress={onPress}>
                    {Icon.Search({color: Colors.border})}
                  </TouchCus>
                }
                success
                autoFocus
                {...inputProps}
              />
            )}
          />
        );

      default:
        return <Header {...header} />;
    }
  }, [action, onPress]);
  return (
    <>
      <SafeAreaViewCus bgColor={bgColor ?? Colors.main} edges={safeAreaEdges}>
        <>
          <SafeAreaStatusBar modeContent={statusBarMode} />
          <KeyboardAvoidingView
            behavior={isIos ? 'padding' : undefined}
            // keyboardVerticalOffset={20}
            style={styles.flex1}>
            {headerCustom()}
            {children}
          </KeyboardAvoidingView>
        </>
      </SafeAreaViewCus>
    </>
  );
};

export default HomeLayout;

export interface IMainLayoutProps {
  children?: React.ReactNode;
  bgColor?: string;
  statusBarMode?: TmodeContent;
  header?: any;
  setAction?: any;
  action?: string;
  safeAreaEdges?: any[];
  inputProps?: any;
  onPress?: any;
}
