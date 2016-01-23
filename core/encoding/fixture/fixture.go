package fixture

// UnmarshalWithFilePath ...
func UnmarshalWithFilePath(filePath string, v interface{}) error {
	decoder := NewDecoderWithFilePath(filePath)
	if decoder == nil {
		return nil
	}
	return decoder.Decode(v)
}
