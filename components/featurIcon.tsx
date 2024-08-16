import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg";
import { Link } from 'expo-router';

const FeatureTool = ({ title }: { title: string }) => {

    return (
        <Link href={"/effect-screen"} replace>
            <View className='gap-y-1 mr-4 w-[80px] items-center'>
                <View className='w-full rounded-[15px] h-[75px] bg-outline justify-center items-center'>
                    <Svg width="38" height="38" viewBox="0 0 33 33" fill="none">
                        <Path d="M4.5 9.5C4.5 6.73867 6.73867 4.5 9.5 4.5H23.5C26.2613 4.5 28.5 6.73867 28.5 9.5V23.5C28.5 26.2613 26.2613 28.5 23.5 28.5H9.5C6.73867 28.5 4.5 26.2613 4.5 23.5V9.5ZM8.21733 10.6C7.83067 10.7267 7.83067 11.2733 8.21733 11.4013C9.108 11.6933 9.80667 12.392 10.1 13.2827C10.2267 13.6693 10.7733 13.6693 10.9013 13.2827C11.1947 12.392 11.892 11.6933 12.7827 11.4013C13.1693 11.2747 13.1693 10.728 12.7827 10.6C11.892 10.3067 11.1933 9.608 10.9 8.71733C10.7733 8.33067 10.2267 8.33067 10.0987 8.71733C9.80667 9.608 9.108 10.3067 8.21733 10.6ZM20.4747 9.944C20.324 9.48533 19.676 9.48533 19.5253 9.944L18.82 12.088C18.4733 13.144 17.644 13.972 16.588 14.32L14.444 15.0253C13.9853 15.176 13.9853 15.824 14.444 15.9747L16.588 16.68C17.644 17.0267 18.472 17.856 18.8187 18.912L19.524 21.056C19.6747 21.5147 20.3227 21.5147 20.4733 21.056L21.1787 18.912C21.5253 17.856 22.3547 17.028 23.4093 16.68L25.5533 15.9747C26.012 15.824 26.012 15.176 25.5533 15.0253L23.4093 14.32C22.3533 13.9733 21.5253 13.144 21.1787 12.0893L20.4747 9.944ZM12.9747 18.944C12.824 18.4853 12.176 18.4853 12.0253 18.944L11.9387 19.2067C11.592 20.2627 10.7627 21.0907 9.708 21.4387L9.44533 21.5253C8.98667 21.676 8.98667 22.324 9.44533 22.4747L9.708 22.5613C10.764 22.908 11.592 23.7373 11.9387 24.792L12.0253 25.0547C12.176 25.5133 12.824 25.5133 12.9747 25.0547L13.0613 24.792C13.408 23.736 14.2373 22.908 15.2933 22.5613L15.556 22.4747C16.0147 22.324 16.0147 21.676 15.556 21.5253L15.2933 21.4387C14.2373 21.092 13.4093 20.2627 13.0613 19.2067L12.9747 18.944Z" fill="white" />
                    </Svg>
                </View>
                <Text style={{ fontFamily: "Poppins-regular" }} className='text-text text-center text-xs'>{title}</Text>
            </View>
        </Link>
    )
}

export default FeatureTool