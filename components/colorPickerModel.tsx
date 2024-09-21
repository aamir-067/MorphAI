import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, HueCircular } from 'reanimated-color-picker';


interface Props {
    colorPicked: string;
    setColorPicked: React.Dispatch<React.SetStateAction<string>>
}
export default function ColorPickerModel(props: Props) {
    const [showModal, setShowModal] = useState(false);

    // Note: 👇 This can be a `worklet` function.
    const onSelectColor = ({ hex }: { hex: string }) => {
        props.setColorPicked(hex);
    };

    const oldValue = props.colorPicked
    return (
        <View style={styles.container} className='ml-3 bg-background'>
            <Button title='' onPress={() => setShowModal(true)} color={`${props.colorPicked}`} />

            {/* <TouchableOpacity onPress={() => setShowModal(true)} className={`bg-[${props.colorPicked}] h-full w-8/12 rounded-sm`} /> */}


            <Modal visible={showModal} animationType='slide'>

                <View className='w-screen h-screen bg-background'>
                    <View className='mx-auto my-3'>
                        <ColorPicker style={{ width: '70%' }} value={oldValue} onComplete={onSelectColor}>

                            <View className='gap-y-2'>
                                <Preview hideInitialColor colorFormat='hex' textStyle={{ fontFamily: "Poppins-Regular", color: "white" }} />

                                <Panel1 boundedThumb={true} />
                                <HueSlider />
                                <OpacitySlider boundedThumb={false} />
                                <Swatches colors={["#FFE5CF", "#640D5F", "#D91656", "#FFEB55", "#6256CA", "#FFEB00"]} />
                            </View>
                        </ColorPicker>
                        <Button title='Ok' onPress={() => setShowModal(false)} />
                    </View>
                </View>


            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});