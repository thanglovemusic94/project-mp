function MaskedPhoneLabel({text}) {
    let maskedText = text;
    let maskedNum = maskedText.substr(3, 4);
    maskedText = maskedText.replace(maskedNum, 'xxxx');
    return (
        <span>{maskedText}</span>
    );
}

export default MaskedPhoneLabel;
