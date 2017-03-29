# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170329183403) do

  create_table "Album", primary_key: "AlbumId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string  "Title",    limit: 160, null: false, collation: "utf8_general_ci"
    t.integer "ArtistId",             null: false
    t.index ["ArtistId"], name: "IFK_AlbumArtistId", using: :btree
  end

  create_table "Artist", primary_key: "ArtistId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "Name", limit: 120, collation: "utf8_general_ci"
  end

  create_table "Customer", primary_key: "CustomerId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string  "FirstName",    limit: 40, null: false, collation: "utf8_general_ci"
    t.string  "LastName",     limit: 20, null: false, collation: "utf8_general_ci"
    t.string  "Company",      limit: 80,              collation: "utf8_general_ci"
    t.string  "Address",      limit: 70,              collation: "utf8_general_ci"
    t.string  "City",         limit: 40,              collation: "utf8_general_ci"
    t.string  "State",        limit: 40,              collation: "utf8_general_ci"
    t.string  "Country",      limit: 40,              collation: "utf8_general_ci"
    t.string  "PostalCode",   limit: 10,              collation: "utf8_general_ci"
    t.string  "Phone",        limit: 24,              collation: "utf8_general_ci"
    t.string  "Fax",          limit: 24,              collation: "utf8_general_ci"
    t.string  "Email",        limit: 60, null: false, collation: "utf8_general_ci"
    t.integer "SupportRepId"
    t.index ["SupportRepId"], name: "IFK_CustomerSupportRepId", using: :btree
  end

  create_table "Employee", primary_key: "EmployeeId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string   "LastName",   limit: 20, null: false, collation: "utf8_general_ci"
    t.string   "FirstName",  limit: 20, null: false, collation: "utf8_general_ci"
    t.string   "Title",      limit: 30,              collation: "utf8_general_ci"
    t.integer  "ReportsTo"
    t.datetime "BirthDate"
    t.datetime "HireDate"
    t.string   "Address",    limit: 70,              collation: "utf8_general_ci"
    t.string   "City",       limit: 40,              collation: "utf8_general_ci"
    t.string   "State",      limit: 40,              collation: "utf8_general_ci"
    t.string   "Country",    limit: 40,              collation: "utf8_general_ci"
    t.string   "PostalCode", limit: 10,              collation: "utf8_general_ci"
    t.string   "Phone",      limit: 24,              collation: "utf8_general_ci"
    t.string   "Fax",        limit: 24,              collation: "utf8_general_ci"
    t.string   "Email",      limit: 60,              collation: "utf8_general_ci"
    t.index ["ReportsTo"], name: "IFK_EmployeeReportsTo", using: :btree
  end

  create_table "Genre", primary_key: "GenreId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "Name", limit: 120, collation: "utf8_general_ci"
  end

  create_table "Invoice", primary_key: "InvoiceId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer  "CustomerId",                                            null: false
    t.datetime "InvoiceDate",                                           null: false
    t.string   "BillingAddress",    limit: 70,                                       collation: "utf8_general_ci"
    t.string   "BillingCity",       limit: 40,                                       collation: "utf8_general_ci"
    t.string   "BillingState",      limit: 40,                                       collation: "utf8_general_ci"
    t.string   "BillingCountry",    limit: 40,                                       collation: "utf8_general_ci"
    t.string   "BillingPostalCode", limit: 10,                                       collation: "utf8_general_ci"
    t.decimal  "Total",                        precision: 10, scale: 2, null: false
    t.index ["CustomerId"], name: "IFK_InvoiceCustomerId", using: :btree
  end

  create_table "InvoiceLine", primary_key: "InvoiceLineId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer "InvoiceId",                          null: false
    t.integer "TrackId",                            null: false
    t.decimal "UnitPrice", precision: 10, scale: 2, null: false
    t.integer "Quantity",                           null: false
    t.index ["InvoiceId"], name: "IFK_InvoiceLineInvoiceId", using: :btree
    t.index ["TrackId"], name: "IFK_InvoiceLineTrackId", using: :btree
  end

  create_table "MediaType", primary_key: "MediaTypeId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "Name", limit: 120, collation: "utf8_general_ci"
  end

  create_table "Playlist", primary_key: "PlaylistId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "Name", limit: 120, collation: "utf8_general_ci"
  end

  create_table "PlaylistTrack", primary_key: ["PlaylistId", "TrackId"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer "PlaylistId", null: false
    t.integer "TrackId",    null: false
    t.index ["TrackId"], name: "IFK_PlaylistTrackTrackId", using: :btree
  end

  create_table "Track", primary_key: "TrackId", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string  "Name",         limit: 200,                          null: false, collation: "utf8_general_ci"
    t.integer "AlbumId"
    t.integer "MediaTypeId",                                       null: false
    t.integer "GenreId"
    t.string  "Composer",     limit: 220,                                       collation: "utf8_general_ci"
    t.integer "Milliseconds",                                      null: false
    t.integer "Bytes"
    t.decimal "UnitPrice",                precision: 10, scale: 2, null: false
    t.index ["AlbumId"], name: "IFK_TrackAlbumId", using: :btree
    t.index ["GenreId"], name: "IFK_TrackGenreId", using: :btree
    t.index ["MediaTypeId"], name: "IFK_TrackMediaTypeId", using: :btree
  end

  create_table "api_keys", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string   "access_token"
    t.string   "name"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_foreign_key "Album", "Artist", column: "ArtistId", primary_key: "ArtistId", name: "FK_AlbumArtistId"
  add_foreign_key "Customer", "Employee", column: "SupportRepId", primary_key: "EmployeeId", name: "FK_CustomerSupportRepId"
  add_foreign_key "Employee", "Employee", column: "ReportsTo", primary_key: "EmployeeId", name: "FK_EmployeeReportsTo"
  add_foreign_key "Invoice", "Customer", column: "CustomerId", primary_key: "CustomerId", name: "FK_InvoiceCustomerId"
  add_foreign_key "InvoiceLine", "Invoice", column: "InvoiceId", primary_key: "InvoiceId", name: "FK_InvoiceLineInvoiceId"
  add_foreign_key "InvoiceLine", "Track", column: "TrackId", primary_key: "TrackId", name: "FK_InvoiceLineTrackId"
  add_foreign_key "PlaylistTrack", "Playlist", column: "PlaylistId", primary_key: "PlaylistId", name: "FK_PlaylistTrackPlaylistId"
  add_foreign_key "PlaylistTrack", "Track", column: "TrackId", primary_key: "TrackId", name: "FK_PlaylistTrackTrackId"
  add_foreign_key "Track", "Album", column: "AlbumId", primary_key: "AlbumId", name: "FK_TrackAlbumId"
  add_foreign_key "Track", "Genre", column: "GenreId", primary_key: "GenreId", name: "FK_TrackGenreId"
  add_foreign_key "Track", "MediaType", column: "MediaTypeId", primary_key: "MediaTypeId", name: "FK_TrackMediaTypeId"
end
