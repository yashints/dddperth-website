import Link from 'next/link'
import * as React from 'react'
import { Fragment } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { MenuItem } from '../../config/types'

interface NavArgs {
  pagePath: string
  menu: MenuItem[]
}

const isFirstBranchMatched = (pagePath: string, href: string) => {
  const last = pagePath.lastIndexOf('/')
  const sub = last > 0 ? pagePath.substring(0, last) : pagePath
  return href === sub
}

class Nav extends React.Component<NavArgs> {
  constructor(props: NavArgs) {
    super(props)
  }

  render() {
    return (
      <Bootstrap.Navbar className="main">
        <Bootstrap.Navbar.Header>
          <Bootstrap.Navbar.Toggle />
        </Bootstrap.Navbar.Header>
        <Bootstrap.Navbar.Collapse>
          <Bootstrap.Nav>
            {this.props.menu.map(item => (
              <Fragment key={item.href}>
                <Link href={item.href} passHref>
                  <Bootstrap.NavItem active={isFirstBranchMatched(this.props.pagePath, item.href)}>
                    {!item.external && item.name}
                    {item.external && (
                      <span>
                        <span aria-hidden="true">
                          {item.name}
                          &nbsp;
                          <i className="fa fa-external-link" />
                        </span>
                        <span className="sr-only">{item.name}, will open in a new window</span>
                      </span>
                    )}
                  </Bootstrap.NavItem>
                </Link>
              </Fragment>
            ))}
          </Bootstrap.Nav>
        </Bootstrap.Navbar.Collapse>
      </Bootstrap.Navbar>
    )
  }
}

export default Nav
