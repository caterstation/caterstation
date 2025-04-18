import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { blue, greyBg, white } from './Colors'

const OtpInp = () => {
  return (
    <View>
     <OTPInputView
    style={{backgroundColor: white,}}
    pinCount={4}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>
    </View>
  )
}
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    borderColor: blue,
  },

  borderStyleHighLighted: {
    borderColor: greyBg,
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    // borderWidth: 0,
    borderWidth: 2,
    fontSize:20,
    color:blue,
    borderColor: blue,

  },

  underlineStyleHighLighted: {
    borderColor: blue,
    
  },
})

export default OtpInp