@extends('layouts.master')
<!-- head -->
@section('title')
    Betting
@endsection
<!-- title -->
@section('head')
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <link href="{{ URL::asset('assets/global/plugins/datatables/datatables.min.css')}}" rel="stylesheet" type="text/css" /> 
    <link href="{{ URL::asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css')}}" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL PLUGINS -->
     <style>
        .blog-modal-main-div{
            padding-right: 30em;
        }
    </style>
@endsection
    
@section('content')


@section('content')

<div class="page-content-wrapper">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content" style="min-height: 1489px;">
        <!-- BEGIN PAGE HEAD-->
        <div class="page-head">
            <!-- BEGIN PAGE TITLE -->
            <div class="page-title">
                <h1>Blogs

                </h1>
            </div>
            <!-- END PAGE TITLE -->

        </div>
        <!-- END PAGE HEAD-->
        <!-- BEGIN PAGE BREADCRUMB -->
        <ul class="page-breadcrumb breadcrumb">
            <li>
                <a href="{{url('admin-dashboard')}}">Home</a>
                <i class="fa fa-circle"></i>
            </li>

            <li>
                <span class="active">Blogs</span>
            </li>

            <span class="set-right"><a href="{{route('admin-blog.create')}}" class="btn btn-primary "  >Add New</a></span>
        </ul>
        <!-- END PAGE BREADCRUMB -->
        <div class="row">

        </div>
        
        @if(session('error'))<div class="alert alert-danger">{{ session('error') }}</div><br>@endif
        @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div><br>@endif
        
        <div class="row">

            <div class="col-md-12">
                <!-- BEGIN EXAMPLE TABLE PORTLET-->
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption font-dark">
                            <i class="icon-settings font-dark"></i>
                            <span class="caption-subject bold uppercase">Blogs</span>
                        </div>

                        <div class="tools"></div>
                    </div>

                    <div class="portlet-body">
                        <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">
                        <table class="table table-striped table-bordered table-hover" id="sample_1">
                            <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody><?php $i = 1; ?>


                            @foreach($blogs as $blog)
                            <tr>
                                <td>{{ $i++ }}</td>
                                <td>
                                 @if(file_exists(public_path('assets/images/blog/'.$blog->image)))
                                    <img src="{{ asset('assets/images/blog')}}/{{$blog->image}}" width="80px" height="80px" /> 
                                @else
                                    <img src="{{asset('assets/images/noimage.png')}}" height="80px" width="80px" />
                                @endif
                                   
                                </td>
                                <td>{{ $blog->title }}</td>
                                
                                <td>{{ str_limit($blog->description, 100)  }}</td>
                               
                                <td> <?php echo date('j M, Y h:i:s A', strtotime($blog->created_at)); ?></td>
                                <td >
                                    <a href="#form_moda{{$blog->id}}" data-toggle="modal" class="btn btn-xs blue" style="margin-left: 5px;"><i class="fa fa-eye"></i>  </a>
                                    <a href="{{route('admin-blog.edit',$blog->id)}}" data-toggle="modal" class="btn btn-xs blue" style="margin-left: 5px;"><i class="fa fa-pencil"></i>  </a>
                                   
                                   
                                    {{ Form::open(['method' => 'DELETE', 'class'=>'set-right' ,'route' => ['admin-blog.destroy',$blog->id]]) }}
                                       {{ Form::button('<i class="fa fa-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs'] )  }}
                                    {{ Form::close() }}
                                    
                                    <div id="form_moda{{$blog->id}}" class="blog-modal-main-div modal fade" role="dialog" aria-hidden="true" tabindex="-1" style="display: none;">
                                        <div class="modal-dialog">
                                            <div class="modal-content" style="    width: 195%;">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Blog  Details</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <h3 class="text-center">{{ $blog->title }}</h3>
                                                        <div class="col-md-12">
                                                            <table class="table table-hover table-bordered">
                                                                <tr>
                                                                    <th>Image:</th><td>
                                                                         @if(file_exists(public_path('assets/images/blog/'.$blog->image)))
                                                                            <img src="{{ URL::asset('assets/images/blog')}}/{{$blog->image}}" width="80px" height="80px" /> 
                                                                        @else
                                                                            <img src="{{  URL::asset('images/noimage.png') }}" height="80px" width="80px" />
                                                                        @endif
                                                                       </td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Title:</th><td>{{ $blog->title }}</td>
                                                                </tr>

                                                                <tr>
                                                                    <th>Description:</th><td>{{ $blog->description  }}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Long Description:</th><td>{!! $blog->long_description  !!}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </td>

                            </tr>

                            @endforeach

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    </div>

    @endsection

    @section('script')
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="{{asset('assets/global/scripts/datatable.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/global/plugins/datatables/datatables.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js')}}" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="{{asset('assets/pages/scripts/table-datatables-buttons.min.js')}}" type="text/javascript"></script>
    <!-- END PAGE LEVEL SCRIPTS -->
    <script>
      
    </script>
    @endsection
   