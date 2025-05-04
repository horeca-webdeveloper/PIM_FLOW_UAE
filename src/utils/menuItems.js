
  // Import your custom icon (make sure the path is correct)

 import sidebarAttributeIcon from "../../src/assets/sidebar/sidebarAttributeIcon.png"
 
    export const menuItems = [
      // Products submenu
      { label: "Inventory", link: "/", icon: sidebarAttributeIcon,parentMenu:'Products',ParentLink:'/' },
      { label: "Parent Category", link: "/categories", icon: sidebarAttributeIcon,parentMenu:'Products',ParentLink:'/' },
      { label: "Product Families", link: "/sub-categories", icon: sidebarAttributeIcon,parentMenu:'Products',ParentLink:'/' },
      { label: "Import", link: "/product/import", icon: sidebarAttributeIcon,parentMenu:'Products',ParentLink:'/' },
      { label: "Export", link: "/product/export", icon: sidebarAttributeIcon ,parentMenu:'Products',ParentLink:'/'},
    
      // Attributes submenu
      { label: "Manage Attributes", link: "/Attributes", icon: sidebarAttributeIcon ,parentMenu:'Attributes',ParentLink:'#'},
      { label: "Attribute Grps", link: "/attribute-groups", icon: sidebarAttributeIcon ,parentMenu:'Attributes',ParentLink:'#'},
      { label: "Product Family", link: "/product-families", icon: sidebarAttributeIcon ,parentMenu:'Attributes',ParentLink:'#'},
      { label: "Export", link: "/export", icon: sidebarAttributeIcon,parentMenu:'Attributes',ParentLink:'#' },
      { label: "Import", link: "/import", icon: sidebarAttributeIcon,parentMenu:'Attributes',ParentLink:'#' },
    
      // Brands submenu
      { label: "Manage Brands", link: "/BrandManagement", icon: sidebarAttributeIcon,parentMenu:'Brands',ParentLink:'#' },
      { label: "TempOne", link: "/brand/first", icon: sidebarAttributeIcon,parentMenu:'Brands',ParentLink:'#' },
      { label: "TempTwo", link: "/brand/second", icon: sidebarAttributeIcon,parentMenu:'Brands',ParentLink:'#' },
      { label: "TempThree", link: "/brand/third", icon: sidebarAttributeIcon ,parentMenu:'Brands',ParentLink:'#'},
    
      // Vendors submenu
      { label: "Manage Vendor", link: "/VendorManagement", icon: sidebarAttributeIcon ,parentMenu:'Vendors',ParentLink:'#'},
      { label: "Pre Valuation Vendor", link: "/PreVendorManagement", icon: sidebarAttributeIcon ,parentMenu:'Vendors',ParentLink:'#'},
    
      // SEO submenu
      { label: "Export", link: "/seoexport", icon: sidebarAttributeIcon,parentMenu:'SEO',ParentLink:'#' },
      { label: "Import", link: "/seoimport", icon: sidebarAttributeIcon,parentMenu:'SEO',ParentLink:'#' },
      
      //extra menu
      { label: "Pricing", link: "/", icon: sidebarAttributeIcon,parentMenu:'Pricing',ParentLink:'#' },
      { label: "Faq", link: "/", icon: sidebarAttributeIcon,parentMenu:'Faq',ParentLink:'#' },
      { label: "Media Management", link: "/media-management", icon: sidebarAttributeIcon,parentMenu:'Media Management',ParentLink:'#' },
      { label: "Orders", link: "#", icon: '', parentMenu: "Orders", ParentLink: "#" },
      { label: "Performance", link: "#", icon: '', parentMenu: "Performance", ParentLink: "#" },
      { label: "Analytics", link: "#", icon: '', parentMenu: "Analytics", ParentLink: "#" },
      { label: "Invoice", link: "#", icon: '', parentMenu: "Invoice", ParentLink: "#" },
      { label: "Settings", link: "#", icon: '', parentMenu: "Settings", ParentLink: "#" },
      { 
        label: "Users", 
        link: "/user-management", 
        icon: '', 
        parentMenu: "User Management", 
        ParentLink: "#" 
      },
      { 
        label: "Roles & Permission", 
        link: "/role-management", 
        icon: '', 
        parentMenu: "Roles & Permission", 
        ParentLink: "#" 
      },
       

    ];
    
  
  