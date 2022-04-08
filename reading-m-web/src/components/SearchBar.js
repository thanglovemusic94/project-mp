import { Button, Form } from 'react-bootstrap'

function SearchBar({ onChange, onFinish }) {
    return (
        <div className="input-btn-group">
            <div className="input-icon-group ipw-349 w-100">
                <Form.Control
                    type="text"
                    size="sm"
                    placeholder="지도교사 이름을 입력하세요."
                    onChange={(e) => onChange(e.target.value)}
                />
                <i className="lcicon-search"></i>
            </div>
            <Button
                variant="g700"
                size="sm"
                className="btw-100"
                type="button"
                onClick={onFinish}
            >
                검색
            </Button>
        </div>
    )
}

export default SearchBar
