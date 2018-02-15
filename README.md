# phishKill

## Under construction

This will be a tool to run tests against search engines such as google, play store, app store to find potentially malicious domains/applications and report

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them
(Only google search works for now)

```
Create a new file "proxies.json" inside /config
add proxy list in following format
[
    "http://142.234.59.202:8800",
    "http://89.32.251.110:8800",
    "http://173.186.232.165:8800",
]

npm install
node tests/google/mew-ads.js

(feel free to change search terms under /config/configs.json)
```
## TODO
1. Add play store
2. Add apple store
3. twillio intergration for instant notification
4. make it so that it can be run on a container

## Authors

* **Kosala Hemachandra** - *Initial work* - [kvhnuke](https://github.com/kvhnuke)

See also the list of [contributors](https://github.com/MyEtherWallet/phishKill/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

