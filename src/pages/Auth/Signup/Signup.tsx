import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import { AuthButton } from '../../../components/Button';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHandleFetch } from '../../../hooks';
import { checkIfItemExistsInCache } from '../../../utils';
import { cacheOperations } from '../../../state/ducks/cache';
import { withAlert } from 'react-alert';
import dictionary from '../../../dictionary';
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';


// import input fields
import { TextFeildGroup } from '../../../components/Field';

const initialValues = {
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('Firstname')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Lastname')
    .required()
    .min(2, 'Lastname must have at least 2 characters '),
  phone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters'),
  passwordConfirmation: Yup.string()
    .label('Confirm password')
    .required()
    .min(6, 'Confirm password must have at least 6 characters')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  address1: Yup.string()
    .label('Address line 1')
    .required()
    .min(3, 'Address line 1 must have at least 3 characters '),

  email: Yup.string().label('Email').email('Please enter a valid email'),
});

interface Props {
  history: any;
  addItemToCache: (any) => void;
  cache: any;
  alert: any;
}

const Signup = ({ addItemToCache, cache, history, alert }: Props) => {
  const [signupState, handlePost] = useHandleFetch({}, 'signup');

  const [selectedCountryValue, setSelectedCountryValue] = useState({
    value: 'Bangladesh',
    label: 'Bangladesh',
  });

  const [selectedCityValue, setSelectedCityValue] = useState({
    value: 'city',
    label: 'City',
  });

  const [countryListState, handleCountryListFetch] = useHandleFetch(
    [],
    'countryList'
  );

  const [cityListState, handleCityListFetch] = useHandleFetch([], 'cityList');

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const handleSubmit = async (values, actions) => {
    const signupRes = await handlePost({
      body: {
        phone: values.phone,
        email: values.email,
        password: values.password,
        password2: values.passwordConfirmation,
        address1: values.address1,
        address2: values.address2,
        firstName: values.firstName,
        lastName: values.lastName,
        country: selectedCountryValue.value,
        city: selectedCityValue.value,
      },
    });

    // @ts-ignore
    if (signupRes && signupRes['status'] === 'ok') {
      history.push('/signin');
    } else {
      if (
        signupState.error['isError'] &&
        !(Object.keys(signupState.error['error']).length > 0)
      ) {
        actions.resetForm({});
        alert.error('Something went wrong');
      }
    }

    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (checkIfItemExistsInCache(`countryList`, cache)) {
      const countryList = cache['countryList'];
      setCountryList(countryList);
    } else {
      const getAndSetCountryList = async () => {
        const countryList = await handleCountryListFetch({});
        // @ts-ignore
        if (countryList) {
          // @ts-ignore
          setCountryList(countryList);
          addItemToCache({
            countryList: countryList,
          });
        }
      };

      getAndSetCountryList();
    }
  }, []);

  useEffect(() => {
    if (
      checkIfItemExistsInCache(`cityList/${selectedCountryValue.value}`, cache)
    ) {
      const cityList = cache[`cityList/${selectedCountryValue.value}`];
      setCityList(cityList);
      // @ts-ignore
      const cityValue = cityList.length > 0 && cityList.find(city => city.name === 'Dhaka');

      if (cityValue) {
        setSelectedCityValue({
          value: cityValue['name'],
          label: cityValue['name'],
        });
      }
      else {
        // @ts-ignore
        const indexZerocityValue = cityList.length > 0 && cityList[0];
        setSelectedCityValue({
          value: indexZerocityValue['name'],
          label: indexZerocityValue['name'],
        });
      }
    } else {
      const getAndSetCityList = async () => {
        const cityList = await handleCityListFetch({
          urlOptions: {
            placeHolders: {
              country: selectedCountryValue.value,
            },
          },
        });
        // @ts-ignore
        if (cityList) {
          // @ts-ignore
          setCityList(cityList);
          // @ts-ignore
          const cityValue = cityList.length > 0 && cityList.find(city => city.name === 'Dhaka');

          if (cityValue) {
            setSelectedCityValue({
              value: cityValue['name'],
              label: cityValue['name'],
            });
          }
          else {
            // @ts-ignore
            const indexZerocityValue = cityList.length > 0 && cityList[0];
            setSelectedCityValue({
              value: indexZerocityValue['name'],
              label: indexZerocityValue['name'],
            });
          }
          addItemToCache({
            [`cityList/${selectedCountryValue.value}`]: cityList,
          });
        }
      };

      getAndSetCityList();
    }
  }, [selectedCountryValue]);

  const handleSelectCountryChange = (value) => {
    setSelectedCountryValue(value);
  };

  const handleSelectCityChange = (value) => {
    setSelectedCityValue(value);
  };


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);




  
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
        minHeight: '40px',
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









  return (
    <>
    <Header/>
    <div className='auth auth-signup'>
     
      <div className='formContainer formContainer-signup'>
      <h1 className='auth_title'>{dictionary.signupTitle}</h1>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            isSubmitting,
            touched,
            handleBlur,
            setFieldTouched,
          }) => (
              <>
                <div
                  className='block-title authTitle'
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
                      type='text'
                      value={values.firstName}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldTouched('firstName');
                      }}
                      errors={
                        (touched.firstName && errors.firstName) ||
                        (!isSubmitting && signupState.error['error']['firstName'])
                      }
                    />
                  </div>

                  <div className='formContainerOfTwoItem'>
                    <TextFeildGroup
                      label='Last name'
                      name='lastName'
                      type='text'
                      value={values.lastName}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldTouched('lastName');
                      }}
                      errors={
                        (touched.lastName && errors.lastName) ||
                        (!isSubmitting && signupState.error['error']['lastName'])
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
                          {!isSubmitting && signupState.error['error']['country']}
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
                          {!isSubmitting && signupState.error['error']['city']}
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
                    (!isSubmitting && signupState.error['error']['address1'])
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
                    (!isSubmitting && signupState.error['error']['address2'])
                  }
                />

                <div
                  className='block-title authTitle'
                  style={{
                    margin: '20px 0',
                  }}
                >
                  <span>Contact Information</span>
                </div>

                <TextFeildGroup
                  label='Phone'
                  name='phone'
                  type='text'
                  value={values.phone}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched('phone');
                  }}
                  errors={
                    (touched.phone && errors.phone) ||
                    (!isSubmitting && signupState.error['error']['phone'])
                  }
                />

                <TextFeildGroup
                  label='Email'
                  name='email'
                  type='text'
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched('email');
                  }}
                  errors={
                    (touched.email && errors.email) ||
                    (!isSubmitting && signupState.error['error']['email'])
                  }
                />

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
                    (!isSubmitting && signupState.error['error']['password'])
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
                    (!isSubmitting && signupState.error['error']['password2'])
                  }
                />

                <AuthButton
                  onclick={handleSubmit}
                  disabled={
                    !isValid ||
                    !values.firstName ||
                    !values.lastName ||
                    !values.password ||
                    !values.phone ||
                    !values.passwordConfirmation ||
                    !values.address1
                  }
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </AuthButton>
              </>
            )}
        </Formik>
        <p className='lead text-center authtextInfo'>
        Have an account?{' '}
        <span className='authLink' onClick={() => history.push('/signin')}>
          Signin{' '}
        </span>
      </p>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

const mapDispatchToProps = {
  addItemToCache: cacheOperations.addItemToCache,
};

const mapStateToProps = (state) => ({
  cache: state.cache,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(withAlert()(Signup)));
