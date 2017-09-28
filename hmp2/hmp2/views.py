# -*- coding: utf-8 -*-

"""
Django views for the IBDMDB website.
"""

import re
import sys
import time
import os.path
import datetime
import subprocess

from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.template import RequestContext, TemplateDoesNotExist
from django.template.loader import get_template


def project_summary(request, project, data_type):
    """
    Retrieves a static HTML summary report for the given IBDMDB project
    and output type.

    Requires:
        None

    Args:
        request (django.HttpRequest): HTTP request object containing
            all information about the incoming payload.
        project (string): The project name used in lookup for the
            summary report.
        data_type (string): The data type of the summary report.

    Returns:
        django.HttpResponse - An HTTP response directing the user to the
            corresponding summary report.
    """
    template_path = os.path.join('hmp2',
                                 'static',
                                 project,
                                 data_type,
                                 'summary_report.html')

    try:
        template = get_template(template_path)
    except TemplateDoesNotExist as tde:
        raise tde

    return render(request, template_path, {}, content_type='text/html')