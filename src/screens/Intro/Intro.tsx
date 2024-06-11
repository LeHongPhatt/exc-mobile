import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Images} from 'assets';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import {NavigationService, Routes} from 'navigation';
import {slidesIntro} from 'utils';
import {useAuth, useKey} from 'hooks';
import {TextCus} from 'components';

const Intro = () => {
  const {saveKeyStore, getKeyStore} = useKey();
  const [checkintro, setcheckintro] = useState('');
  // const user = useSelector(userSelect);
  const {user} = useAuth();

  useEffect(() => {
    _retrieveData();
  }, []);

  const _storeData = async () => {
    saveKeyStore('CHECKINTRO', 'Y');
  };

  const _retrieveData = async () => {
    // try {
    const valueTK = await getKeyStore('CHECKINTRO');
    valueTK && setcheckintro(valueTK);
    // } catch (error) {
    //   // Error retrieving data
    // }
  };

  const renderNextButton = () => {
    return (
      <View style={styles.nextButton}>
        <Text style={styles.text}>Tiếp</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.nextButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={_onSkipClick}>
          <Text style={styles.text}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View>
        <TouchableOpacity onPress={_onSkipClick}>
          <Text style={styles.text}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderItem = ({item}: any) => {
    return (
      <ImageBackground style={styles.image} source={item.image}>
        <View style={styles.slide}>
          <View style={styles.viewsct}>
            <TextCus style={styles.title}>{item.title}</TextCus>
            <TextCus style={styles.text}>{item.text}</TextCus>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    _storeData();
    // setshowRealApp(true);
  };

  const _onSkipClick = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    _storeData();
    // setshowRealApp(true);
    NavigationService.navigate(Routes.Login);
  };

  const checkLogin = () => {
    // console.log('checkLogin', user);

    if (user) {
      NavigationService.replace(Routes.HomeTabs);
    } else {
      NavigationService.navigate(Routes.Login);
    }
  };

  return checkintro !== 'Y' ? (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slidesIntro}
      onDone={_onDone}
      dotStyle={styles.dot}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      showSkipButton={true}
    />
  ) : (
    <View style={styles.bgLotie}>
      <LottieView
        source={Images.splash}
        autoPlay
        loop={false}
        speed={0.5}
        duration={2000}
        onAnimationFinish={checkLogin}
      />
    </View>
  );
};

export default Intro;
