// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import FontAwsome from 'react-native-vector-icons/FontAwesome5'
// import { blue, white } from './Colors';



// const ImgHbar = ({ backPress, title, headerImage }) => {
//     return (
//         <ImageBackground source={headerImage} style={{ height: 100, width: '100%' }}>
//         <View style={{ flex: 1, justifyContent: 'center' }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
//             <TouchableOpacity style={{ paddingHorizontal:responsiveWidth(4), paddingVertical:responsiveHeight(2)}} onPress={backPress}>
//   <FontAwsome name="angle-left" color={blue} size={20} />

//               {/* <Text>< Back</Text> */}
//             </TouchableOpacity>
//             <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold' , color:blue }}>{title}</Text>
//             <TouchableOpacity />
//           </View>
//         </View>
//       </ImageBackground>
      
//     );
//   };
  


// export default ImgHbar


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { blue } from './Colors';
import { useNavigation } from '@react-navigation/native';

const ImgHbar = ({ title, headerImage }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={headerImage} style={styles.imageBackground}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => {
                        console.log("Back button pressed");
                        navigation.goBack();
                    }}
                >
                    <FontAwesome name="angle-left" color={blue} size={20} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        height: 100,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        padding: responsiveHeight(2),
        zIndex: 1, // Ensure the back button is on top
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: blue,
        textAlign: 'center',
    },
});

export default ImgHbar;
