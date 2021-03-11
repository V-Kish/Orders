import * as React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { EmojiField } from '../../provider/ChatEmoji/EmojiField';
import { IconButtonView } from '../IconButtonView';
import {
    mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import { IconButton } from '../../provider/IconButton';

class EmojiFieldView extends TypedBaseComponent<EmojiField>{

    private rows: Array<Array<IconButton>>;

    constructor(props) {
        super(props);
        this.rows = new Array<Array<IconButton>>();
        const amountInRow = 7;
        for (let i = 0, first = 0, second = amountInRow; i < (this.model.smiles.length -1) / amountInRow; i++) {
            this.rows[i] = this.model.smiles.slice(first, second);
            first = second;
            second += amountInRow;
        }
    }

    render() {
        super.render();
        return (
            <View style={styles.container} ref={(ref) => { this.model.refOnEmojiField = ref }}>
                <ScrollView style={styles.scrollView}>
                    {this.rows.map((icons, index) =>
                        <View style={styles.row} key={`SmileRow_${index}`}>
                            {icons.map((item, index) => <IconButtonView model={item} key={`SmileItem_${index}_${index}`} />)}
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    scrollView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: "column",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: hp(15),
    },
    fixedEmojiPadding:{
        height:hp(35),
        backgroundColor:'red',
    }
});

export { EmojiFieldView };
