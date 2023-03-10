import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Card, Chip, IconButton } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { COLORS, IMAGES } from '../utils/app_constants'

const BookList = ({data, handleGoToBookPreviewScreen}) => {

  function shortenSentence(sentence, maxLength) {
    // If the sentence is already shorter than the maximum length, return the original sentence
    if (sentence.length <= maxLength) return sentence;
  
    // Otherwise, return the first part of the sentence up to the maximum length,
    // followed by an ellipsis (...) to indicate that the sentence has been shortened
    return sentence.substring(0, maxLength) + '...';
  }
  
  return (
    <Card style={{padding: 16}} elevation={0}>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => handleGoToBookPreviewScreen(data)}>
        <Image source={{uri: data?.book_cover ?? IMAGES.NO_IMAGE_AVAILABLE}}
            style={{width: 150, height: 150, borderRadius: 15}} /> 
        </TouchableOpacity>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <View style={{flex: 1, marginLeft: 10}}>
            <TouchableOpacity onPress={() => handleGoToBookPreviewScreen(data)}>
            <Text style={{fontWeight: '900', fontSize: 14, color: '#4d5156'}}>{data?.title ?? 'No title'}</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 12, color: 'gray'}}>By : {data?.author ?? 'Not available'}</Text>
            <Text style={{fontSize: 10}}>Published : {data?.publishedDate ?? 'Not available'}</Text>            
            <Text style={{fontSize: 10, color: '#4d5156'}}>{shortenSentence(data?.description ?? 'No description', 50)}</Text>
            </View>
            <View style={{marginLeft: 15}}>
            <IconButton onPress={() => handleGoToBookPreviewScreen(data)} icon={"code-greater-than"} />
            </View>
        </View>
        </View>
    </Card>
  )
}

export default BookList