import { View, Text, Image } from 'react-native'
const ToolCard = ({ title, img }: { title: string, img: any }) => {
    return (
        <View className='overflow-hidden w-[180px]   bg-buttonBackground rounded-[5px] h-[140px]'>
            <Image className='object-contain w-full h-[113px]' source={img} />
            <Text style={{ fontFamily: "Poppins-Regular" }} className='text-text text-sm text-center mt-0.5'>{title}</Text>
        </View>
    )
}

export default ToolCard