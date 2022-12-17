import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Card,IconButton } from 'react-native-paper'
import { IMAGES } from '../utils/app_constants'

const SearchBookList = ({data, handleGoToBookPreviewScreen}) => {


  return (
    <Card style={{padding: 25, marginTop: 10}} elevation={0}>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleGoToBookPreviewScreen(data)} >
            <Image source={{uri: data?.book_cover ?? IMAGES.NO_IMAGE_AVAILABLE}}
            style={{width: 80, height: 80, borderRadius: 15}} /> 
          </TouchableOpacity>
        
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <View style={{flex: 1, marginLeft: 22}}>
            <TouchableOpacity onPress={() => handleGoToBookPreviewScreen(data)}>
            <Text style={{fontWeight: '900', fontSize: 14}}>{data?.title ?? 'No title'}</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 12}}>Published: {data?.publishedDate ?? 'Not available'}</Text> 
            <Text style={{fontSize: 12}}>By : {data?.author ?? 'Unknown author'}</Text>            
            </View>
            <View style={{marginLeft: 15}}>
            <IconButton onPress={() => handleGoToBookPreviewScreen(data)} icon={"code-greater-than"} />
            </View>
        </View>
        </View>
    </Card>
  )
}

export default SearchBookList