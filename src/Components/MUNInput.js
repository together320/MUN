
import AutosizeInput from 'react-input-autosize';

export function MUNInput({value, onChange}) {
    return <AutosizeInput
        value={value}
        onChange={onChange}
        inputStyle={{ background: '#111430', border: "1px solid #5C84FF", borderRadius: 6, padding: "9px 19px", outline: 0, fontFamily: "Poppins", fontStyle: 'normal', fontWeight: 400, fontSize: 16, fontHeight: 24, color: 'white'}}
    />
}