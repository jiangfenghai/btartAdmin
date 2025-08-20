import React, { useState, useRef, useEffect } from 'react';
import "./PhoneNumberInput.css"
import { useStore } from '../../store';
const PhoneNumberInput = () => {

    // 国家数据
    const countries = [
        { code: "852", name: "Hong Kong", flag: "hk" },
        { code: "86", name: "China", flag: "cn" },
        { code: "1", name: "United States", flag: "us" },
        { code: "44", name: "United Kingdom", flag: "gb" },
        { code: "81", name: "Japan", flag: "jp" },
        { code: "82", name: "South Korea", flag: "kr" },
        { code: "65", name: "Singapore", flag: "sg" },
        { code: "60", name: "Malaysia", flag: "my" },
        { code: "63", name: "Philippines", flag: "ph" },
        { code: "66", name: "Thailand", flag: "th" },
        { code: "84", name: "Vietnam", flag: "vn" },
        { code: "91", name: "India", flag: "in" }
    ];

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    // const [telephoneNumber, setTelephoneNumber] = useState('');
    const { phoneNumber, setTelephoneNumber, setAreaCode } = useStore()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectRef = useRef(null);

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handlePhoneChange = (e) => {
        const number = e.target.value
        setTelephoneNumber(number)
        setAreaCode(selectedCountry.code)

    };

    return (
        <div className="form-group">
            {/* <label htmlFor="phone">Telephone Number *</label> */}
            <div className="phone-input-container">
                <div
                    className="country-select"
                    onClick={toggleDropdown}
                    ref={selectRef}
                >
                    <img
                        src={`https://flagcdn.com/${selectedCountry.flag}.svg`}
                        className="country-flag"
                        alt={selectedCountry.name}
                    />
                    {/* <span className="country-code">+{selectedCountry.code}</span> */}
                    {/* <span className="dropdown-arrow">▼</span> */}
                    <img
                        className="vector-3"
                        alt="Vector"
                        src="/img/vector-110-1.svg"
                    />
                </div>

                {isDropdownOpen && (
                    <div className="country-dropdown" ref={dropdownRef}>
                        {countries.map((country) => (
                            <div
                                key={country.code}
                                className="country-option"
                                onClick={() => handleCountrySelect(country)}
                            >
                                <img
                                    src={`https://flagcdn.com/${country.flag}.svg`}
                                    className="country-option-flag"
                                    alt={country.name}
                                />
                                <span className="country-option-name">{country.name}</span>
                                <span className="country-option-code">+{country.code}</span>
                            </div>
                        ))}
                    </div>
                )}
                <span className="country-code">+{selectedCountry.code}</span>
                <input
                    type="tel"
                    className="phone-input"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="52341234"
                />
            </div>


        </div>
    );
};

export default PhoneNumberInput;