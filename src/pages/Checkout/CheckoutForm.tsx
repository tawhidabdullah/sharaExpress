import React from 'react';
import Select from 'react-select';
import { TextFeildGroup } from '../../components/Field';



const dot = (color = '#111b3d') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
      backgroundColor: color,
      borderRadius: 6,
      content: '" "',
      display: 'block',
      marginRight: 8,
      // height: 10,
      // width: 10,
  },
});




const colourStyles = {
  control: styles => ({
      ...styles,
      backgroundColor: 'rgb(247, 247, 247)',
      border: '1px solid rgb(241, 241, 241)',
      height: '50px',
      minHeight: '50px',
      borderRadius: '6px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = '#009e7f';
      return {
          ...styles,
          backgroundColor: isDisabled
              ? null
              : isSelected
                  ? color
                  : isFocused
                      ? color
                      : 'rgb(247, 247, 247)',
          color: isDisabled
              ? '#333'
              : isSelected
                  ? color
                  : isFocused
                      ? 'rgb(247, 247, 247)'
                      : '#303a3f',
          cursor: isDisabled ? 'not-allowed' : 'default',

          ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled && (isSelected ? color : '#303a3f'),
          },
      };
  },
  input: styles => ({ ...styles, color: '#303a3f', ...dot() }),
  placeholder: styles => ({ ...styles, color: '#303a3f', ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, marginTop: '-2px', marginLeft: '-2px', color: '#303a3f', ...dot(data.color) }),
};







interface Props {
  values: any;
  handleChange: any;
  touched: any;
  errors: any;
  serverErrors: any;
  isSubmitting: boolean;
  isAuthenticated: boolean;
  countryList: any;
  selectedCountryValue: any;
  handleSelectCountryChange: (any) => void;
  cityList: any;
  selectedCityValue: any;
  handleSelectCityChange: (any) => void;
  setFieldTouched: (e: any) => void;
  isUseAccountBillingAddresss: boolean;
}

const CheckoutForm = ({
  values,
  handleChange,
  errors,
  isSubmitting,
  serverErrors,
  isAuthenticated,
  countryList,
  selectedCountryValue,
  handleSelectCountryChange,
  cityList,
  selectedCityValue,
  handleSelectCityChange,
  setFieldTouched,
  touched,
  isUseAccountBillingAddresss,
}: Props) => {
  return (
    <>
      <>
        <div
          className='block-title authTitle sm'
          style={{
            margin: '20px 0',
          }}
        >
          <span>Personal Information</span>
        </div>

        <div className='formContainerOfTwo'>
          <div className='formContainerOfTwoItem'>
            <TextFeildGroup
              label='First name'
              name='firstName'
              placeholder='first name'
              type='text'
              value={values.firstName}
              onChange={(e) => {
                handleChange(e);
                setFieldTouched('firstName');
              }}
              errors={
                (touched.firstName && errors.firstName) ||
                (!isSubmitting && serverErrors.firstName)
              }
            />
          </div>
          <div className='formContainerOfTwoItem'>
            <TextFeildGroup
              label='Last name'
              name='lastName'
              placeholder='last name'
              type='text'
              value={values.lastName}
              onChange={(e) => {
                handleChange(e);
                setFieldTouched('lastName');
              }}
              errors={
                (touched.lastName && errors.lastName) ||
                (!isSubmitting && serverErrors.lastName)
              }
            />
          </div>
        </div>

        <div className='formContainerOfTwo'>
          <div className='formContainerOfTwoItem'>
            {countryList.length > 0 && (
              <div>
                <label className='formLabel'>Country</label>
                <Select
                  styles={colourStyles}
                  value={selectedCountryValue}
                  onChange={(value) => handleSelectCountryChange(value)}
                  options={countryList.map((country) => ({
                    value: country['name'],
                    label: country['name'],
                  }))}
                />

                <div className='select-invalid-feedback'>
                  {errors.country || (!isSubmitting && serverErrors.country)}
                </div>
              </div>
            )}
          </div>
          <div className='formContainerOfTwoItem formContainterSelect'>
            {cityList.length > 0 && (
              <div>
                <label className='formLabel'>City</label>
                <Select
                  styles={colourStyles}
                  value={selectedCityValue}
                  onChange={(value) => handleSelectCityChange(value)}
                  options={cityList.map((city) => ({
                    value: city['name'],
                    label: city['name'],
                  }))}
                />

                <div className='select-invalid-feedback'>
                  {errors.city || (!isSubmitting && serverErrors.city)}
                </div>
              </div>
            )}
          </div>
        </div>

        <TextFeildGroup
          label='Address'
          name='address1'
          placeholder='Address line 1'
          type='text'
          value={values.address1}
          onChange={(e) => {
            handleChange(e);
            setFieldTouched('address1');
          }}
          errors={
            (touched.address1 && errors.address1) ||
            (!isSubmitting && serverErrors.address1)
          }
        />
        <TextFeildGroup
          name='address2'
          placeholder='Address line 2'
          type='text'
          value={values.address2}
          onChange={(e) => {
            handleChange(e);
            setFieldTouched('address2');
          }}
          errors={
            (touched.address2 && errors.address2) ||
            (!isSubmitting && serverErrors.address2)
          }
        />

        <div
          className='block-title authTitle sm'
          style={{
            margin: '20px 0',
          }}
        >
          <span>Contact Information</span>
        </div>

        <TextFeildGroup
          label='Phone'
          name='phone'
          placeholder='Mobile phone no'
          type='text'
          value={values.phone}
          onChange={(e) => {
            handleChange(e);
            setFieldTouched('phone');
          }}
          errors={
            (touched.phone && errors.phone) ||
            (!isSubmitting && serverErrors.phone)
          }
        />

        <TextFeildGroup
          label='Email'
          name='email'
          placeholder='Email address'
          type='text'
          value={values.email}
          onChange={(e) => {
            handleChange(e);
            setFieldTouched('email');
          }}
          errors={
            (touched.email && errors.email) ||
            (!isSubmitting && serverErrors.email)
          }
        />

        {!isAuthenticated && (
          <>
            <TextFeildGroup
              label='Password'
              name='password'
              placeholder='******'
              type='password'
              value={values.password}
              onChange={(e) => {
                handleChange(e);
                setFieldTouched('password');
              }}
              errors={
                (touched.password && errors.password) ||
                (!isSubmitting && serverErrors.password)
              }
            />

            <TextFeildGroup
              label='Confirm Password'
              name='passwordConfirmation'
              placeholder='******'
              type='password'
              value={values.passwordConfirmation}
              onChange={(e) => {
                handleChange(e);
                setFieldTouched('passwordConfirmation');
              }}
              errors={
                (touched.passwordConfirmation &&
                  errors.passwordConfirmation) ||
                (!isSubmitting && serverErrors.password2)
              }
            />
          </>
        )}
      </>
    </>
  );
};

export default CheckoutForm;
