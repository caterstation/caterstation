import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Heading from '../Heading';
import {black, blue} from '../Colors';

const parseHtmlToData = htmlContent => {
  const data = [];
  const sectionsRegex = /<p[^>]*>(.*?)<\/p>\s*(<ul>[\s\S]*?<\/ul>)?/g; // /<p>(.*?)<\/p>\s*(<ul>[\s\S]*?<\/ul>)?/g; // Updated regex

  let match;
  while ((match = sectionsRegex.exec(htmlContent)) !== null) {
    const heading = match[1].replace(/<[^>]+>/g, '').trim(); // Extract heading text and remove nested HTML
    const listItems = match[2] || ''; // Extract the <ul> content, if available
    //console.log('Full Match:', match[0]);
    //console.log('Heading:', heading);
    //console.log('List Items:', listItems);
    const bullets = [];
    if (listItems) {
      const listItemRegex = /<li[^>]*>(.*?)<\/li>/g; ///<li>(.*?)<\/li>/g;
      let listItemMatch;
      while ((listItemMatch = listItemRegex.exec(listItems)) !== null) {
        const listItem = listItemMatch[1].replace(/<[^>]+>/g, '').trim(); // Remove nested HTML
        const [text1, text2] = listItem.split(/(?=\()/); // Split at the first parenthesis
        bullets.push({
          type: 'bullet',
          text1: text1.trim(),
          text2: text2 ? text2.trim() : '',
        });
      }
    }

    // Push heading with its corresponding bullets
    data.push({
      type: 'heading',
      text: heading.replace('&amp;', '&'),
      bullets: bullets,
    });
  }

  return data;
};

const SplitHeading = ({title}) => {
  ////console.log('---------title ', title);
  const headingArray = title.split(':');
  const subheadingArray = headingArray[1]?.split(',');
  // //console.log(headingArray[1], '  headingArray[1] ');
  ////console.log(subheadingArray, ' subHeadingArray ', subheadingArray?.length);
  return (
    <View style={{flex: 1}}>
      {headingArray.length > 1 ? (
        subheadingArray && subheadingArray.length > 3 ? (
          // If there are more than 3 subheadings
          <>
            <Heading style={styles.heading}>{`${headingArray[0]}:`}</Heading>
            <Text style={styles.subtitle}>
              {headingArray[1].replace(', &', ' & ').trim()}
            </Text>
          </>
        ) : (
          // For fewer subheadings, render in a row
          <View style={styles.headerRow}>
            <Heading style={styles.heading}>{`${headingArray[0]}:`}</Heading>
            <Text style={styles.subtitle}>
              {headingArray[1].replace(', &', ' & ').trim()}
            </Text>
          </View>
        )
      ) : (
        // If no ':' exists in the title
        <Heading style={styles.heading}>{title}</Heading>
      )}
    </View>
  );
};

const RenderHtmlContent = ({htmlContent}) => {
  //console.log('------------------------------------');
  //console.log('htmlContent :', htmlContent);
  const parsedData = parseHtmlToData(htmlContent);
  //console.log('parsedData :', parsedData);

  return (
    <View style={styles.container}>
      {parsedData.map((section, index) => (
        <View key={index}>
          {/* Render heading */}

          {/* <Heading style={styles.heading}>{section.text}</Heading> */}
          <SplitHeading title={section.text} />

          {/* Render bullets associated with the heading */}
          {section.bullets.map((bullet, idx) => (
            <BulletinItem
              key={`${index}-${idx}`}
              text1={bullet.text1}
              text2={bullet.text2}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const BulletinItem = ({text1, text2}) => (
  <View style={styles.row}>
    <Image style={styles.image} source={require('../../Images/bullet.png')} />
    {text2 != '' ? (
      <View style={styles.column}>
        <Text style={styles.text}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    ) : (
      <Text style={styles.text}>{text1}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: responsiveWidth(5),
  },
  heading: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(2),
  },
  row: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
    //marginBottom: responsiveHeight(2),
  },
  column: {
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  image: {
    height: responsiveHeight(1),
    width: responsiveWidth(2),
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(2),
  },
  text: {
    fontSize: responsiveFontSize(1.8),
  },
  subtitle: {
    fontSize: 14,
    color: blue,
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(1),
    //marginBottom: responsiveHeight(2),
    fontWeight: '400',
  },
});

export default RenderHtmlContent;
