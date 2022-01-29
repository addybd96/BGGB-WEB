import React from 'react';
import CONSTANT from './../constant';
import Loader from '../component/common/Loader';

import { getLanguageList, getLocale } from './../action/PublicActions';
import { setOptions, onChange, setStorage, getStorage } from '../utils';

class Language extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const selLang = getStorage(CONSTANT.storage.language);
    this.state = {
      language: { name: 'language', value: selLang, error: '', isRequired: true, options: [] },
      showLoader: false,
      locale: undefined
    }
  }

  componentDidMount() {
    document.title = "Language - HRMS";
    getLanguageList().then((res: any) => {
      setOptions(this, this.state.language.name, res.result);
    })
  }

  render() {
    const { language, showLoader, locale } = this.state;
    return (
      <div className="fluid-container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card m-3">
              <div className="card-body">
                <h2 className="text-left">{locale !== undefined ? locale.lbl_changeLanguage : 'Change language'}</h2>
                <p>{locale !== undefined ? locale.lbl_changeLanguage_desc : 'Below is the list of languages we support right now. Please let us know if your language is missing from the list at hrms.support@barodagujaratrrb.co.in'}</p>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      {
                        language.options.map((item: any, index: number) => {
                          return (
                            <div className="form-check" key={index}>
                              <label className="form-check-label">
                                <input type="radio" onChange={this.onChange} className="form-check-input" name={language.name} value={item.fileName} checked={item.fileName === language.value} />
                                {item.name}
                              </label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-8" />
                    <div className="col-md-4">
                      <button className="btn btn-primary btn-sm btn-block" type="submit">{locale !== undefined ? locale.btn_saveChanges : 'Save changes'}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {
          showLoader && <Loader />
        }
      </div>
    )
  }

  private onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value);
    this.setState({ showLoader: true });
    getLocale(value).then((res: any) => {
      setStorage(CONSTANT.storage.language, value);
      setStorage(CONSTANT.storage.locale, res.data);
      this.setState({ showLoader: false, locale: res.data });
    });
  }

  onSubmit = () => {
    this.props.history.push(CONSTANT.url.login);
  }
}

export default Language;
